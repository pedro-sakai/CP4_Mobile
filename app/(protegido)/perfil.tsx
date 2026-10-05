import React, { useState } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import BotaoAcao from "@/componentes/BotaoAcao";
import Aviso from "@/componentes/Aviso";
import { useSessao } from "@/contexto/SessaoContexto";
import { cores } from "@/tema/cores";

export default function TelaPerfil() {
  const { usuario, sair, excluirConta, processando } = useSessao();
  const [erroExclusao, setErroExclusao] = useState("");

  async function aoSair() {
    const resultado = await sair();
    if (resultado.ok) {
      router.replace("/login");
    }
  }

  function confirmarExclusao() {
    Alert.alert(
      "Excluir conta",
      "Tem certeza que deseja excluir sua conta? Essa ação não poderá ser desfeita.",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", style: "destructive", onPress: aoExcluir },
      ]
    );
  }

  async function aoExcluir() {
    setErroExclusao("");
    const resultado = await excluirConta();
    if (!resultado.ok) {
      setErroExclusao(resultado.mensagem);
      return;
    }
    router.replace("/login");
  }

  return (
    <SafeAreaView style={estilos.container}>
      <View style={estilos.conteudo}>
        <Text style={estilos.titulo}>Minha conta</Text>

        <View style={estilos.cartao}>
          <Text style={estilos.rotulo}>Nome</Text>
          <Text style={estilos.valor}>{usuario?.displayName || "-"}</Text>

          <Text style={estilos.rotulo}>E-mail</Text>
          <Text style={estilos.valor}>{usuario?.email}</Text>
        </View>

        {erroExclusao ? <Aviso tipo="erro" mensagem={erroExclusao} /> : null}

        <BotaoAcao texto="Sair da conta" onPress={aoSair} carregando={processando} variante="fantasma" />

        <BotaoAcao
          texto="Excluir conta"
          onPress={confirmarExclusao}
          carregando={processando}
          variante="perigo"
        />
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
    padding: 28,
  },
  titulo: {
    color: cores.texto,
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },
  cartao: {
    backgroundColor: cores.superficie,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 18,
    marginBottom: 8,
  },
  rotulo: {
    color: cores.textoSuave,
    fontSize: 12,
    marginBottom: 3,
  },
  valor: {
    color: cores.texto,
    fontSize: 16,
    marginBottom: 14,
  },
});
