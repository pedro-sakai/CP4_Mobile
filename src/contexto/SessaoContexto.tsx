import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  deleteUser,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "@/servicos/firebase";
import { gravarSessao, limparSessao } from "@/servicos/sessaoLocal";
import { traduzirErro } from "@/servicos/mensagensErro";

type Resultado = { ok: true } | { ok: false; mensagem: string };

type SessaoContextoTipo = {
  usuario: User | null;
  verificandoSessao: boolean;
  processando: boolean;
  cadastrar: (nome: string, email: string, senha: string) => Promise<Resultado>;
  entrar: (email: string, senha: string) => Promise<Resultado>;
  sair: () => Promise<Resultado>;
  solicitarRedefinicaoSenha: (email: string) => Promise<Resultado & { mensagem?: string }>;
  excluirConta: () => Promise<Resultado>;
};

const SessaoContexto = createContext<SessaoContextoTipo | null>(null);

export function SessaoProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<User | null>(null);
  const [verificandoSessao, setVerificandoSessao] = useState(true);
  const [processando, setProcessando] = useState(false);

  useEffect(() => {
    const cancelar = onAuthStateChanged(auth, async (usuarioFirebase) => {
      if (usuarioFirebase) {
        setUsuario(usuarioFirebase);
        await gravarSessao({
          uid: usuarioFirebase.uid,
          email: usuarioFirebase.email,
          nome: usuarioFirebase.displayName,
        });
      } else {
        setUsuario(null);
        await limparSessao();
      }
      setVerificandoSessao(false);
    });

    return cancelar;
  }, []);

  async function cadastrar(nome: string, email: string, senha: string): Promise<Resultado> {
    setProcessando(true);
    try {
      const credencial = await createUserWithEmailAndPassword(auth, email, senha);
      await updateProfile(credencial.user, { displayName: nome });
      setUsuario({ ...credencial.user, displayName: nome } as User);
      return { ok: true };
    } catch (erro: any) {
      return { ok: false, mensagem: traduzirErro(erro?.code) };
    } finally {
      setProcessando(false);
    }
  }

  async function entrar(email: string, senha: string): Promise<Resultado> {
    setProcessando(true);
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      return { ok: true };
    } catch (erro: any) {
      return { ok: false, mensagem: traduzirErro(erro?.code) };
    } finally {
      setProcessando(false);
    }
  }

  async function sair(): Promise<Resultado> {
    setProcessando(true);
    try {
      await signOut(auth);
      await limparSessao();
      return { ok: true };
    } catch (erro: any) {
      return { ok: false, mensagem: traduzirErro(erro?.code) };
    } finally {
      setProcessando(false);
    }
  }

  async function solicitarRedefinicaoSenha(email: string) {
    setProcessando(true);
    const mensagemPadrao =
      "Se o e-mail estiver cadastrado, você receberá as instruções para redefinir sua senha.";
    try {
      await sendPasswordResetEmail(auth, email);
      return { ok: true as const, mensagem: mensagemPadrao };
    } catch (erro: any) {
      if (erro?.code === "auth/invalid-email") {
        return { ok: false as const, mensagem: traduzirErro(erro.code) };
      }
      return { ok: true as const, mensagem: mensagemPadrao };
    } finally {
      setProcessando(false);
    }
  }

  async function excluirConta(): Promise<Resultado> {
    setProcessando(true);
    try {
      if (!auth.currentUser) {
        return { ok: false, mensagem: "Nenhum usuário autenticado no momento." };
      }
      await deleteUser(auth.currentUser);
      await limparSessao();
      setUsuario(null);
      return { ok: true };
    } catch (erro: any) {
      return { ok: false, mensagem: traduzirErro(erro?.code) };
    } finally {
      setProcessando(false);
    }
  }

  return (
    <SessaoContexto.Provider
      value={{
        usuario,
        verificandoSessao,
        processando,
        cadastrar,
        entrar,
        sair,
        solicitarRedefinicaoSenha,
        excluirConta,
      }}
    >
      {children}
    </SessaoContexto.Provider>
  );
}

export function useSessao() {
  const contexto = useContext(SessaoContexto);
  if (!contexto) {
    throw new Error("useSessao precisa ser usado dentro de um SessaoProvider");
  }
  return contexto;
}
