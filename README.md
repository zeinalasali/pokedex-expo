# 📱 Pokédex Mobile App (Expo + React Native)

A modern **Pokédex mobile application** built using **React Native and Expo**, consuming the public **PokéAPI** to display Pokémon data with dynamic styling and screen-based navigation.

This project demonstrates real-world **mobile frontend engineering skills**, including API integration, async data handling, routing, and scalable component architecture.

---

## 🚀 Features

- 📋 **Pokémon List Screen**
  - Fetches Pokémon from an external REST API
  - Displays name, primary type, and front/back sprites
  - Dynamic background colors based on Pokémon type

- 🔍 **Details Screen (Routing)**
  - Navigation using `expo-router`
  - Passes Pokémon name as a route parameter
  - Built for easy expansion (stats, abilities, species, etc.)

- 🎨 **Dynamic UI Styling**
  - Type-based color theming
  - Responsive layouts using `ScrollView`
  - Clean, mobile-first UI design

- ⚡ **Asynchronous Data Fetching**
  - Multiple API requests per Pokémon
  - Parallel data fetching with `Promise.all`
  - State-driven UI updates using React hooks

---

## 🧠 Skills & Concepts Demonstrated

### Mobile & Frontend Development
- React Native
- Expo
- TypeScript
- Functional components
- Hooks (`useState`, `useEffect`)

### Routing & Navigation
- `expo-router`
- Stack-based navigation
- URL-style params between screens

### API & Data Handling
- REST API consumption (PokéAPI)
- Async/await patterns
- Data transformation for UI usage
- Error handling and defensive coding

### UI / UX
- Conditional styling
- Component reuse
- Separation of concerns
- Scalable layout structure

---

## 🗂 Project Structure

```txt
app/
├── index.tsx        # Home screen (Pokémon list)
├── details.tsx      # Details screen (route param based)
└── _layout.tsx      # Navigation stack configuration
```

---

## 🔧 Implementation Highlights

### Pokémon Fetching Logic
- Initial API call retrieves Pokémon list
- Secondary fetch retrieves detailed data per Pokémon
- API responses are mapped into UI-friendly objects

### Dynamic Type-Based Styling
```ts
const colorsByType: Record<string, string> = {
  fire: "#EE8130",
  water: "#6390F0",
  grass: "#7AC74C",
  electric: "#F7D02C",
  ...
};
```

This enables automatic UI theming without hardcoding styles per component.

---

## 📦 Tech Stack

| Category | Tools |
|-------|------|
| Framework | React Native |
| Platform | Expo |
| Language | TypeScript |
| Routing | expo-router |
| API | PokéAPI |
| Styling | React Native StyleSheet |

---

## 📈 Future Improvements

- Pokémon stats and abilities
- Species and evolution chains
- Search and filtering
- Pagination / infinite scrolling
- Offline caching
- Animations and transitions
- Backend integration (Supabase / Firebase)

---

## 🧑‍💻 Why This Project

This project demonstrates:
- Real API integration
- Mobile navigation patterns
- Async data handling
- Scalable app structure
- Clean, readable React Native code

Designed as a **portfolio-ready mobile app** suitable for:
- Mobile Developer roles
- Frontend / Full-Stack internships
- Software Engineering co-op positions

---

## ▶️ Getting Started

```bash
git clone https://github.com/your-username/pokedex-expo.git
cd pokedex-expo
npm install
npx expo start
```
