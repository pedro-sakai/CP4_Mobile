import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";

import FormularioRegistro from "@/componentes/FormularioRegistro";
import Aviso from "@/componentes/Aviso";
import { useRegistros } from "@/contexto/RegistrosContexto";
import { DadosRegistro } from "@/servicos/firestoreRegistros";
import { cores } from "@/tema/cores";

export default function TelaEditarRegistro() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { registros, editar } = useRegistros();
  const [processando, setProcessando] = useState(false);
  const [erroGeral, setErroGeral] = useState("");

  const registro = registros.find((item) => item.id === id);

  async function handleConfirmar(dados: DadosRegistro) {
    if (!registro) return;

    setErroGeral("");
    setProcessando(true);
    const resultado = await editar(registro.id, dados);
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
        <Text style={estilos.titulo}>Editar registro</Text>
        <View style={{ width: 60 }} />
      </View>

      {registro ? (
        <FormularioRegistro
          valoresIniciais={{
            descricao: registro.descricao,
            valor: registro.valor,
            categoria: registro.categoria,
            data: registro.data,
          }}
          textoBotao="Salvar alterações"
          processando={processando}
          erroGeral={erroGeral}
          aoConfirmar={handleConfirmar}
        />
      ) : (
        <View style={{ padding: 20 }}>
          <Aviso tipo="erro" mensagem="Registro não encontrado." />
        </View>
      )}
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
