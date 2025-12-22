import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from "react-native";


interface PokemonType {
  type: {
    name: string;
    url: string;
  };
}

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

// Styles for the details screen
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  scrollContainer: {
    gap: 16,
    padding: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 8,
  },
  pokemonName: {
    fontSize: 32,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  pokemonNumber: {
    fontSize: 18,
    color: "#666",
    marginTop: 4,
  },
  twoColumnLayout: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 0,
  },
  leftColumn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  rightColumn: {
    flex: 1,
    gap: 12,
  },
  pokemonImage: {
    width: 200,
    height: 200,
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    color: "#444",
    textAlign: "left",
    letterSpacing: 0.2,
  },
  descriptionContainer: {
    backgroundColor: "#ffffff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  attributesBox: {
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
  },
  attributesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  attributeItem: {
    flex: 1,
    minWidth: "45%",
  },
  attributeFullWidth: {
    minWidth: "100%",
    marginTop: 8,
  },
  attributeLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
    fontWeight: "600",
  },
  attributeValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  abilitiesContainer: {
    gap: 4,
  },
  abilityText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  typeSection: {
    marginTop: 8,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  typeButtonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  typeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  typeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  statsSection: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    width: "100%",
  },
  statRow: {
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
    minWidth: 100,
  },
  statBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  statBarBackground: {
    flex: 1,
    height: 20,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    overflow: "hidden",
  },
  statBarFill: {
    height: "100%",
    borderRadius: 10,
  },
  statValue: {
    fontSize: 14,
    fontWeight: "bold",
    minWidth: 40,
    textAlign: "right",
  },
  evolutionSection: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    width: "100%",
  },
  evolutionChainContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },
  evolutionItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  evolutionArrow: {
    marginHorizontal: 8,
  },
  evolutionArrowText: {
    fontSize: 24,
    color: "#666",
    fontWeight: "bold",
  },
  evolutionCard: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 12,
    minWidth: 120,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  evolutionImage: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
  evolutionName: {
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "capitalize",
    marginBottom: 4,
  },
  evolutionNumber: {
    fontSize: 12,
    color: "#666",
  },
});

// Main component for the details screen
export default function Details() {
  // Retrieving params from main screen
    const params = useLocalSearchParams()
    const name = String(params.name ?? "").toLowerCase();

    // Storing the pokemon data in the state
    const [pokemon, setPokemon] = useState<any>(null);
    const [species, setSpecies] = useState<any>(null);
    const [weaknesses, setWeaknesses] = useState<string[]>([]);
    const [evolutionChain, setEvolutionChain] = useState<any[]>([]);

    // useEffect hook to fetch the pokemon details when the component is mounted
    useEffect(() => {
      if (name) fetchDetails();
    }, [name])

    // Function to fetch the pokemon details from the API
    async function fetchDetails() {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await response.json();
        setPokemon(data);
        // Fetch species using pokemon id
        const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${data.id}`);
        const speciesData = await speciesResponse.json();
        setSpecies(speciesData);
        // Fetch weaknesses
        await fetchWeaknesses(data.types);
        // Fetch evolution chain
        if (speciesData.evolution_chain?.url) {
          await fetchEvolutionChain(speciesData.evolution_chain.url);
        }
      } catch(e) {
        console.log(e);
      }
    }

    // Function to fetch type damage relations and calculate weaknesses
    async function fetchWeaknesses(types: any[]) {
      try {
        const weaknessSet = new Set<string>();
        
        // Fetch damage relations for each type
        await Promise.all(
          types.map(async (typeData: any) => {
            const typeResponse = await fetch(typeData.type.url);
            const typeInfo = await typeResponse.json();
            
            // Add all types that deal 2x damage to this type
            typeInfo.damage_relations.double_damage_from.forEach((weakType: any) => {
              weaknessSet.add(weakType.name);
            });
          })
        );
        
        setWeaknesses(Array.from(weaknessSet));
      } catch(e) {
        console.log("Error fetching weaknesses:", e);
      }
    }

    // Function to flatten evolution chain and fetch Pokemon data
    async function fetchEvolutionChain(evolutionChainUrl: string) {
      try {
        const response = await fetch(evolutionChainUrl);
        const chainData = await response.json();
        
        // Flatten the evolution chain into a linear array
        const flattenedChain: any[] = [];
        
        const flattenChain = (chain: any) => {
          if (chain.species) {
            flattenedChain.push({
              name: chain.species.name,
              url: chain.species.url
            });
          }
          
          if (chain.evolves_to && chain.evolves_to.length > 0) {
            chain.evolves_to.forEach((evolution: any) => {
              flattenChain(evolution);
            });
          }
        };
        
        flattenChain(chainData.chain);
        
        // Fetch Pokemon data for each evolution to get images
        const evolutionData = await Promise.all(
          flattenedChain.map(async (pokemonData: any) => {
            try {
              // Extract ID from URL
              const id = pokemonData.url.split('/').filter(Boolean).pop();
              const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
              const pokemonInfo = await pokemonResponse.json();
              return {
                name: pokemonInfo.name,
                id: pokemonInfo.id,
                image: pokemonInfo.sprites.other?.["official-artwork"]?.front_default || pokemonInfo.sprites.front_default
              };
            } catch(e) {
              console.log("Error fetching evolution Pokemon:", e);
              return {
                name: pokemonData.name,
                id: null,
                image: null
              };
            }
          })
        );
        
        setEvolutionChain(evolutionData);
      } catch(e) {
        console.log("Error fetching evolution chain:", e);
      }
    }



    // Helper functions
    const formatNumber = (num: number) => {
      return `#${String(num).padStart(4, '0')}`;
    };

    const convertHeight = (decimeters: number) => {
      const totalInches = decimeters * 3.937;
      const feet = Math.floor(totalInches / 12);
      const inches = Math.round(totalInches % 12);
      return `${feet}' ${String(inches).padStart(2, '0')}"`;
    };

    const convertWeight = (hectograms: number) => {
      const lbs = hectograms * 0.220462;
      return `${lbs.toFixed(1)} lbs`;
    };

    const getDescription = () => {
      if (!species) return "";
      const englishEntries = species.flavor_text_entries?.filter(
        (entry: any) => entry.language.name === "en"
      );
      // Get the latest version description (prefer newer games)
      const sortedEntries = englishEntries?.sort((a: any, b: any) => {
        // Sort by version name (newer versions typically have higher numbers)
        return b.version.name.localeCompare(a.version.name);
      });
      return sortedEntries?.[0]?.flavor_text?.replace(/\f/g, " ").replace(/\n/g, " ") || "";
    };

    const getCategory = () => {
      if (!species) return "";
      const englishGenera = species.genera?.find(
        (genus: any) => genus.language.name === "en"
      );
      return englishGenera?.genus || "";
    };

    const getGenderDisplay = () => {
      if (!species) return "";
      const genderRate = species.gender_rate;
      if (genderRate === -1) return "Genderless";
      if (genderRate === 0) return "♂";
      if (genderRate === 8) return "♀";
      return "♂ ♀";
    };

    if (!pokemon || !species) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
          <Text>Loading Pokemon details...</Text>
        </View>
      );
    }

    const primaryType = pokemon.types[0]?.type.name || "normal";
    const typeColor = colorsByType[primaryType] || "#A8A77A";

    return (
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        style={{ backgroundColor: typeColor + "20" }}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.pokemonName}>
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </Text>
          <Text style={styles.pokemonNumber}>{formatNumber(pokemon.id)}</Text>
        </View>

        {/* Two Column Layout */}
        <View style={styles.twoColumnLayout}>
          {/* Left Column - Image */}
          <View style={styles.leftColumn}>
            <Image
              source={{ uri: pokemon.sprites.other?.["official-artwork"]?.front_default || pokemon.sprites.front_default }}
              style={styles.pokemonImage}
              resizeMode="contain"
            />
          </View>

          {/* Right Column - Info */}
          <View style={styles.rightColumn}>
            {/* Description */}
            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>{getDescription()}</Text>
            </View>

            {/* Attributes Box */}
            <View style={[styles.attributesBox, { backgroundColor: typeColor + "40" }]}>
              <View style={styles.attributesGrid}>
                <View style={styles.attributeItem}>
                  <Text style={styles.attributeLabel}>Height</Text>
                  <Text style={styles.attributeValue}>{convertHeight(pokemon.height)}</Text>
                </View>
                <View style={styles.attributeItem}>
                  <Text style={styles.attributeLabel}>Weight</Text>
                  <Text style={styles.attributeValue}>{convertWeight(pokemon.weight)}</Text>
                </View>
                <View style={styles.attributeItem}>
                  <Text style={styles.attributeLabel}>Gender</Text>
                  <Text style={styles.attributeValue}>{getGenderDisplay()}</Text>
                </View>
                <View style={styles.attributeItem}>
                  <Text style={styles.attributeLabel}>Category</Text>
                  <Text style={styles.attributeValue}>{getCategory()}</Text>
                </View>
                <View style={[styles.attributeItem, styles.attributeFullWidth]}>
                  <Text style={styles.attributeLabel}>Abilities</Text>
                  <View style={styles.abilitiesContainer}>
                    {pokemon.abilities.map((ability: any, index: number) => (
                      <Text key={index} style={styles.abilityText}>
                        {ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)}
                        {ability.is_hidden && " (Hidden)"}
                      </Text>
                    ))}
                  </View>
                </View>
              </View>
            </View>

            {/* Type Section */}
            <View style={styles.typeSection}>
              <Text style={styles.sectionLabel}>Type</Text>
              <View style={styles.typeButtonsContainer}>
                {pokemon.types.map((typeData: any, index: number) => {
                  const typeName = typeData.type.name;
                  return (
                    <View
                      key={index}
                      style={[
                        styles.typeButton,
                        { backgroundColor: colorsByType[typeName] || "#A8A77A" }
                      ]}
                    >
                      <Text style={styles.typeButtonText}>
                        {typeName.charAt(0).toUpperCase() + typeName.slice(1)}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>

            {/* Weaknesses Section */}
            {weaknesses.length > 0 && (
              <View style={styles.typeSection}>
                <Text style={styles.sectionLabel}>Weaknesses</Text>
                <View style={styles.typeButtonsContainer}>
                  {weaknesses.map((weakness: string, index: number) => (
                    <View
                      key={index}
                      style={[
                        styles.typeButton,
                        { backgroundColor: colorsByType[weakness] || "#A8A77A" }
                      ]}
                    >
                      <Text style={styles.typeButtonText}>
                        {weakness.charAt(0).toUpperCase() + weakness.slice(1)}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        </View>

        {/* Stats Section - Full Width Below Image */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionLabel}>Stats</Text>
          {pokemon.stats.map((stat: any, index: number) => {
            const statName = stat.stat.name.replace("-", " ");
            const statValue = stat.base_stat;
            const maxStat = 255; // Max stat value for normalization
            const percentage = (statValue / maxStat) * 100;

            return (
              <View key={index} style={styles.statRow}>
                <Text style={styles.statLabel}>
                  {statName.charAt(0).toUpperCase() + statName.slice(1)}
                </Text>
                <View style={styles.statBarContainer}>
                  <View style={styles.statBarBackground}>
                    <View
                      style={[
                        styles.statBarFill,
                        { width: `${percentage}%`, backgroundColor: typeColor }
                      ]}
                    />
                  </View>
                  <Text style={styles.statValue}>{statValue}</Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Evolution Chain Section */}
        {evolutionChain.length > 1 && (
          <View style={styles.evolutionSection}>
            <Text style={styles.sectionLabel}>Evolution Chain</Text>
            <View style={styles.evolutionChainContainer}>
              {evolutionChain.map((evolution: any, index: number) => {
                const isCurrentPokemon = evolution.name === pokemon.name;
                return (
                  <View key={index} style={styles.evolutionItem}>
                    {index > 0 && (
                      <View style={styles.evolutionArrow}>
                        <Text style={styles.evolutionArrowText}>→</Text>
                      </View>
                    )}
                    <View style={[
                      styles.evolutionCard,
                      isCurrentPokemon && { borderColor: typeColor, borderWidth: 2 }
                    ]}>
                      {evolution.image && (
                        <Image
                          source={{ uri: evolution.image }}
                          style={styles.evolutionImage}
                          resizeMode="contain"
                        />
                      )}
                      <Text style={styles.evolutionName}>
                        {evolution.name.charAt(0).toUpperCase() + evolution.name.slice(1)}
                      </Text>
                      <Text style={styles.evolutionNumber}>
                        {evolution.id ? formatNumber(evolution.id) : ""}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        )}
      </ScrollView>
    );
}
