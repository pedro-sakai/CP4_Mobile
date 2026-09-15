import React, { useState } from "react";
import {
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";

import Campo from "@/componentes/Campo";
import BotaoAcao from "@/componentes/BotaoAcao";
import Aviso from "@/componentes/Aviso";
import { useSessao } from "@/contexto/SessaoContexto";
import { cores } from "@/tema/cores";

const PADRAO_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function TelaCadastro() {
  const { cadastrar, processando } = useSessao();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmacaoSenha, setConfirmacaoSenha] = useState("");

  const [erros, setErros] = useState<Record<string, string>>({});
  const [erroGeral, setErroGeral] = useState("");

  function camposValidos() {
    const proximosErros: Record<string, string> = {};

    if (!nome.trim()) proximosErros.nome = "Informe seu nome.";

    if (!email.trim()) proximosErros.email = "Informe seu e-mail.";
    else if (!PADRAO_EMAIL.test(email.trim()))
      proximosErros.email = "Formato de e-mail inválido.";

    if (!senha) proximosErros.senha = "Informe uma senha.";
    else if (senha.length < 6)
      proximosErros.senha = "Use pelo menos 6 caracteres.";

    if (!confirmacaoSenha) proximosErros.confirmacaoSenha = "Confirme a senha.";
    else if (senha !== confirmacaoSenha)
      proximosErros.confirmacaoSenha = "As senhas não coincidem.";

    setErros(proximosErros);
    return Object.keys(proximosErros).length === 0;
  }

  async function aoConfirmar() {
    setErroGeral("");
    if (!camposValidos()) return;

    const resultado = await cadastrar(nome.trim(), email.trim(), senha);
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
        <Text style={estilos.titulo}>Cadastro</Text>
        <Text style={estilos.subtitulo}>Leva menos de um minuto</Text>

        <Campo rotulo="Nome" placeholder="Seu nome completo" value={nome} onChangeText={setNome} erro={erros.nome} />
        <Campo
          rotulo="E-mail"
          placeholder="voce@exemplo.com"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          erro={erros.email}
        />
        <Campo
          rotulo="Senha"
          placeholder="Mínimo de 6 caracteres"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
          erro={erros.senha}
        />
        <Campo
          rotulo="Confirmar senha"
          placeholder="Repita a senha"
          secureTextEntry
          value={confirmacaoSenha}
          onChangeText={setConfirmacaoSenha}
          erro={erros.confirmacaoSenha}
        />

        {erroGeral ? <Aviso tipo="erro" mensagem={erroGeral} /> : null}

        <BotaoAcao texto="Criar conta" onPress={aoConfirmar} carregando={processando} />

        <TouchableOpacity style={estilos.linkVoltar} onPress={() => router.back()}>
          <Text style={estilos.textoLinkDestaque}>Já tenho conta — entrar</Text>
        </TouchableOpacity>
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
    marginBottom: 4,
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
