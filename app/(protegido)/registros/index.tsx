import React from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import ItemRegistro from "@/componentes/ItemRegistro";
import Aviso from "@/componentes/Aviso";
import { useRegistros } from "@/contexto/RegistrosContexto";
import { Registro } from "@/servicos/firestoreRegistros";
import { cores } from "@/tema/cores";

function calcularTotal(registros: Registro[]) {
  const total = registros.reduce((soma, registro) => soma + registro.valor, 0);
  return total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function TelaListagemRegistros() {
  const { registros, carregando, erro, remover } = useRegistros();

  function confirmarExclusao(registro: Registro) {
    Alert.alert(
      "Excluir registro",
      "Tem certeza que deseja excluir este registro?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            const resultado = await remover(registro.id);
            if (!resultado.ok) {
              Alert.alert("Erro", resultado.mensagem);
            }
          },
        },
      ]
    );
  }

  return (
    <SafeAreaView style={estilos.container}>
      <View style={estilos.cabecalho}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={estilos.linkVoltar}>Voltar</Text>
        </TouchableOpacity>
        <Text style={estilos.titulo}>Meus gastos</Text>
        <TouchableOpacity onPress={() => router.push("/registros/novo")}>
          <Text style={estilos.linkNovo}>+ Novo</Text>
        </TouchableOpacity>
      </View>

      {registros.length > 0 ? (
        <Text style={estilos.total}>Total: {calcularTotal(registros)}</Text>
      ) : null}

      {erro ? <View style={estilos.avisoContainer}><Aviso tipo="erro" mensagem={erro} /></View> : null}

      {carregando ? (
        <View style={estilos.centralizado}>
          <ActivityIndicator size="large" color={cores.destaque} />
        </View>
      ) : registros.length === 0 ? (
        <View style={estilos.centralizado}>
          <Text style={estilos.vazio}>Nenhum registro encontrado.</Text>
        </View>
      ) : (
        <FlatList
          data={registros}
          keyExtractor={(item) => item.id}
          contentContainerStyle={estilos.lista}
          renderItem={({ item }) => (
            <ItemRegistro
              registro={item}
              aoEditar={() => router.push(`/registros/${item.id}`)}
              aoExcluir={() => confirmarExclusao(item)}
            />
          )}
        />
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
  linkNovo: {
    color: cores.destaque,
    fontSize: 14,
    fontWeight: "700",
  },
  total: {
    color: cores.textoSuave,
    fontSize: 14,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  avisoContainer: {
    paddingHorizontal: 20,
  },
  lista: {
    padding: 20,
    paddingTop: 4,
  },
  centralizado: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  vazio: {
    color: cores.textoSuave,
    fontSize: 15,
  },
});
