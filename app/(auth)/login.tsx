import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { Link, router } from "expo-router";

import Campo from "@/componentes/Campo";
import BotaoAcao from "@/componentes/BotaoAcao";
import Aviso from "@/componentes/Aviso";
import { useSessao } from "@/contexto/SessaoContexto";
import { cores } from "@/tema/cores";

const PADRAO_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function TelaLogin() {
  const { entrar, processando } = useSessao();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erroEmail, setErroEmail] = useState("");
  const [erroSenha, setErroSenha] = useState("");
  const [erroGeral, setErroGeral] = useState("");

  function camposValidos() {
    let valido = true;
    setErroEmail("");
    setErroSenha("");

    if (!email.trim()) {
      setErroEmail("Informe seu e-mail.");
      valido = false;
    } else if (!PADRAO_EMAIL.test(email.trim())) {
      setErroEmail("Formato de e-mail inválido.");
      valido = false;
    }

    if (!senha) {
      setErroSenha("Informe sua senha.");
      valido = false;
    }

    return valido;
  }

  async function aoConfirmar() {
    setErroGeral("");
    if (!camposValidos()) return;

    const resultado = await entrar(email.trim(), senha);
    if (!resultado.ok) {
      setErroGeral(resultado.mensagem);
      return;
    }
    router.replace("/inicio");
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: cores.fundo }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={estilos.conteudo}>
        <Text style={estilos.titulo}>Login</Text>

        <Campo
          rotulo="E-mail"
          placeholder="voce@exemplo.com"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          erro={erroEmail}
        />
        <Campo
          rotulo="Senha"
          placeholder="Sua senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
          erro={erroSenha}
        />

        {erroGeral ? <Aviso tipo="erro" mensagem={erroGeral} /> : null}

        <BotaoAcao texto="Entrar" onPress={aoConfirmar} carregando={processando} />

        <TouchableOpacity
          style={estilos.linkEsqueci}
          onPress={() => router.push("/recuperar-senha")}
        >
          <Text style={estilos.textoLinkDestaque}>Esqueci minha senha</Text>
        </TouchableOpacity>

        <View style={estilos.rodape}>
          <Text style={estilos.textoRodape}>Ainda não tem conta? </Text>
          <Link href="/cadastro">
            <Text style={estilos.textoLinkDestaque}>Cadastre-se</Text>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 28,
  },
  linkEsqueci: {
    alignItems: "center",
    marginTop: 18,
  },
  rodape: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 28,
  },
  textoRodape: {
    color: cores.textoSuave,
    fontSize: 14,
  },
  textoLinkDestaque: {
    color: cores.destaque,
    fontSize: 14,
    fontWeight: "600",
  },
});
