import React from "react";
import { View, ActivityIndicator } from "react-native";
import { Redirect, Stack } from "expo-router";
import { useSessao } from "@/contexto/SessaoContexto";
import { cores } from "@/tema/cores";

export default function LayoutProtegido() {
  const { usuario, verificandoSessao } = useSessao();

  if (verificandoSessao) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: cores.fundo,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color={cores.destaque} />
      </View>
    );
  }

  if (!usuario) {
    return <Redirect href="/login" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
