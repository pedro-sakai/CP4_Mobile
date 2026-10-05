import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { cores } from "@/tema/cores";

export const CATEGORIAS = ["Alimentação", "Transporte", "Lazer", "Saúde", "Outros"];

type Props = {
  selecionada: string;
  aoSelecionar: (categoria: string) => void;
  erro?: string;
};

export default function SeletorCategoria({ selecionada, aoSelecionar, erro }: Props) {
  return (
    <View style={estilos.grupo}>
      <Text style={estilos.rotulo}>Categoria</Text>
      <View style={estilos.linha}>
        {CATEGORIAS.map((categoria) => {
          const ativa = categoria === selecionada;
          return (
            <TouchableOpacity
              key={categoria}
              style={[estilos.chip, ativa && estilos.chipAtivo]}
              onPress={() => aoSelecionar(categoria)}
            >
              <Text style={[estilos.textoChip, ativa && estilos.textoChipAtivo]}>
                {categoria}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {erro ? <Text style={estilos.textoErro}>{erro}</Text> : null}
    </View>
  );
}

const estilos = StyleSheet.create({
  grupo: {
    marginBottom: 14,
  },
  rotulo: {
    color: cores.textoSuave,
    fontSize: 13,
    marginBottom: 6,
  },
  linha: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: cores.superficie,
  },
  chipAtivo: {
    backgroundColor: cores.destaque,
    borderColor: cores.destaque,
  },
  textoChip: {
    color: cores.textoSuave,
    fontSize: 13,
  },
  textoChipAtivo: {
    color: cores.fundo,
    fontWeight: "700",
  },
  textoErro: {
    color: cores.perigo,
    fontSize: 12,
    marginTop: 6,
  },
});
