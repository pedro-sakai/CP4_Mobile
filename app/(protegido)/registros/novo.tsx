import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import FormularioRegistro from "@/componentes/FormularioRegistro";
import { useRegistros } from "@/contexto/RegistrosContexto";
import { DadosRegistro } from "@/servicos/firestoreRegistros";
import { cores } from "@/tema/cores";

export default function TelaNovoRegistro() {
  const { adicionar } = useRegistros();
  const [processando, setProcessando] = useState(false);
  const [erroGeral, setErroGeral] = useState("");

  async function handleConfirmar(dados: DadosRegistro) {
    setErroGeral("");
    setProcessando(true);
    const resultado = await adicionar(dados);
    setProcessando(false);

    if (!resultado.ok) {
      setErroGeral(resultado.mensagem);
      return;
    }
    router.back();
  }

  return (
    <SafeAreaView style={estilos.container}>
      <View style={estilos.cabecalho}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={estilos.linkVoltar}>Cancelar</Text>
        </TouchableOpacity>
        <Text style={estilos.titulo}>Novo registro</Text>
        <View style={{ width: 60 }} />
      </View>

      <FormularioRegistro
        textoBotao="Salvar registro"
        processando={processando}
        erroGeral={erroGeral}
        aoConfirmar={handleConfirmar}
      />
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  cabecalho: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 6,
  },
  linkVoltar: {
    color: cores.textoSuave,
    fontSize: 14,
  },
  titulo: {
    color: cores.texto,
    fontSize: 18,
    fontWeight: "700",
  },
});
