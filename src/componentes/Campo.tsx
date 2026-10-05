import React from "react";
import { View, Text, TextInput, TextInputProps, StyleSheet } from "react-native";
import { cores } from "@/tema/cores";

type Props = TextInputProps & {
  rotulo: string;
  erro?: string;
};

export default function Campo({ rotulo, erro, style, ...resto }: Props) {
  return (
    <View style={estilos.grupo}>
      <Text style={estilos.rotulo}>{rotulo}</Text>
      <TextInput
        style={[estilos.input, erro ? estilos.inputComErro : null, style]}
        placeholderTextColor={cores.textoSuave}
        {...resto}
      />
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
  input: {
    backgroundColor: cores.superficie,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 13,
    color: cores.texto,
    fontSize: 15,
  },
  inputComErro: {
    borderColor: cores.perigo,
  },
  textoErro: {
    color: cores.perigo,
    fontSize: 12,
    marginTop: 4,
  },
});
