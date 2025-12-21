import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

// Storing required pokemon data from API
interface Pokemon {
  name: string;
  image: string;
  imageBack: string;
  types: PokemonType[];
}

// Storing required pokemon type data from API
interface PokemonType {
  type: {
    name: string;
    url: string;
  };
}

// Colour for each pokemon type, hash lookup for each type
const colorsByType: Record<string, string> = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};


// Main component for the home screen
export default function Index() {

  // Storing the pokemon data in the state (current state, setState function, default value)
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);


  // useEffect hook to fetch the pokemon data when the component is mounted
  useEffect(() => {
    fetchPokemons()
  }, []) // Empty array means run only once when the component is mounted


  async function fetchPokemons() {
    try {
      // Fetching the pokemon data from the API
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/?limit=10"
      );
      // Converting the response to JSON
      const data = await response.json();

      // Fetching the detailed pokemon data from const data
      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();
          return {
            name: pokemon.name,
            image: details.sprites.front_default,
            imageBack: details.sprites.back_default,
            types: details.types,
          };
        })
      );

      setPokemons(detailedPokemons);
    } catch(e) {
      console.log(e);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{
        gap: 16,
        padding: 16,
      }}
    >
      {pokemons.map((pokemon) => (
        <Link 
            key={pokemon.name} 
            href={{ pathname: "/details", params: {name : pokemon.name}}}
            style={[
              {
                // @ts-ignore
                backgroundColor: colorsByType[pokemon.types[0].type.name] + 50,
                padding: 20, 
                borderRadius: 20,
              },
              styles.linkContainer
            ]}
        >

          <View style={styles.container}>
            <Text style = {styles.name}>{pokemon.name}</Text>
            <Text style = {styles.type}>{pokemon.types[0].type.name}</Text>

            <View style={styles.imageContainer}>
              <Image 
                source ={{uri: pokemon.image}}
                style={styles.image}
                />
              <Image 
                source ={{uri: pokemon.imageBack}}
                style={styles.image}
                />
            </View>
        </View>
        </Link>
      ))}
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  linkContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: "center"
  },
  type: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray',
    textAlign: "center",
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap',
  },
  image: {
    width: 150,
    height: 150,
  }
})