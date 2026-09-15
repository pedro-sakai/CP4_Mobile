import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { cores } from "@/tema/cores";

type Props = {
  tipo: "erro" | "sucesso";
  mensagem: string;
};

export default function Aviso({ tipo, mensagem }: Props) {
  const ehErro = tipo === "erro";
  return (
    <View
      style={[
        estilos.caixa,
        { borderColor: ehErro ? cores.perigo : cores.sucesso },
      ]}
    >
      <Text style={{ color: ehErro ? cores.perigo : cores.sucesso, fontSize: 13 }}>
        {mensagem}
      </Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  caixa: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
    backgroundColor: "rgba(255,255,255,0.03)",
  },
});
