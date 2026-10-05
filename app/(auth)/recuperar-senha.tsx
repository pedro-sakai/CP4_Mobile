import React, { useState } from "react";
import { Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";

import Campo from "@/componentes/Campo";
import BotaoAcao from "@/componentes/BotaoAcao";
import Aviso from "@/componentes/Aviso";
import { useSessao } from "@/contexto/SessaoContexto";
import { cores } from "@/tema/cores";

const PADRAO_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function TelaRecuperarSenha() {
  const { solicitarRedefinicaoSenha, processando } = useSessao();

  const [email, setEmail] = useState("");
  const [erroEmail, setErroEmail] = useState("");
  const [feedback, setFeedback] = useState<{ ok: boolean; mensagem: string } | null>(null);

  async function aoConfirmar() {
    setFeedback(null);
    setErroEmail("");

    if (!email.trim()) {
      setErroEmail("Informe seu e-mail.");
      return;
    }
    if (!PADRAO_EMAIL.test(email.trim())) {
      setErroEmail("Formato de e-mail inválido.");
      return;
    }

    const resultado = await solicitarRedefinicaoSenha(email.trim());
    setFeedback({ ok: resultado.ok, mensagem: resultado.mensagem ?? "" });
  }

  return (
    <ScrollView
      contentContainerStyle={estilos.conteudo}
      style={{ backgroundColor: cores.fundo }}
    >
      <Text style={estilos.titulo}>Recuperar senha</Text>
      <Text style={estilos.subtitulo}>
        Informe o e-mail da sua conta e enviaremos as instruções de redefinição.
      </Text>

      <Campo
        rotulo="E-mail"
        placeholder="voce@exemplo.com"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        erro={erroEmail}
      />

      {feedback ? <Aviso tipo={feedback.ok ? "sucesso" : "erro"} mensagem={feedback.mensagem} /> : null}

      <BotaoAcao texto="Enviar instruções" onPress={aoConfirmar} carregando={processando} />

      <TouchableOpacity style={estilos.linkVoltar} onPress={() => router.back()}>
        <Text style={estilos.textoLinkDestaque}>Voltar para o login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  conteudo: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 28,
  },
  titulo: {
    color: cores.texto,
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitulo: {
    color: cores.textoSuave,
    fontSize: 14,
    textAlign: "center",
    marginBottom: 26,
  },
  linkVoltar: {
    alignItems: "center",
    marginTop: 20,
  },
  textoLinkDestaque: {
    color: cores.destaque,
    fontSize: 14,
    fontWeight: "600",
  },
});
