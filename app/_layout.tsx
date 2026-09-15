import React from "react";
import { Stack } from "expo-router";
import { SessaoProvider } from "@/contexto/SessaoContexto";
import { cores } from "@/tema/cores";

export default function LayoutRaiz() {
  return (
    <SessaoProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: cores.fundo },
        }}
      />
    </SessaoProvider>
  );
}
