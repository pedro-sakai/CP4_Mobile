import React from "react";
import { View, ActivityIndicator } from "react-native";
import { Redirect } from "expo-router";
import { useSessao } from "@/contexto/SessaoContexto";
import { cores } from "@/tema/cores";

export default function Indice() {
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

  return <Redirect href={usuario ? "/inicio" : "/login"} />;
}
