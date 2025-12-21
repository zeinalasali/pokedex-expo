import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";


export default function Details() {
    const params = useLocalSearchParams()

console.log(params.name)

    return (
        <ScrollView
            contentContainerStyle={{
            gap: 16,
            padding: 16,
          }}
        >


    </ScrollView>
  );
}
