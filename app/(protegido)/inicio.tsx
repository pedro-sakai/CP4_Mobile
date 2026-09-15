import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import { useSessao } from "@/contexto/SessaoContexto";
import { cores } from "@/tema/cores";

export default function TelaInicio() {
  const { usuario } = useSessao();
  const primeiroNome = usuario?.displayName?.split(" ")[0] ?? "por aqui";

  return (
    <SafeAreaView style={estilos.container}>
      <View style={estilos.conteudo}>
        <Text style={estilos.rotuloTela}>Início</Text>
        <Text style={estilos.saudacao}>Olá, {primeiroNome} 👋</Text>
        <Text style={estilos.texto}>
          Sua sessão está ativa e será mantida mesmo se você fechar o app.
        </Text>

        <TouchableOpacity style={estilos.botao} onPress={() => router.push("/perfil")}>
          <Text style={estilos.botaoTexto}>Minha conta</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  conteudo: {
    flex: 1,
    justifyContent: "center",
    padding: 28,
  },
  rotuloTela: {
    color: cores.textoSuave,
    fontSize: 13,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 14,
  },
  saudacao: {
    color: cores.texto,
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 10,
  },
  texto: {
    color: cores.textoSuave,
    fontSize: 15,
    marginBottom: 28,
  },
  botao: {
    backgroundColor: cores.superficieAlt,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
  },
  botaoTexto: {
    color: cores.texto,
    fontSize: 15,
    fontWeight: "600",
  },
});
