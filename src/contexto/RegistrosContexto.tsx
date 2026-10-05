import React, { createContext, useContext, useEffect, useState } from "react";

import { useSessao } from "@/contexto/SessaoContexto";
import {
  Registro,
  DadosRegistro,
  observarRegistros,
  criarRegistro,
  atualizarRegistro,
  excluirRegistro,
} from "@/servicos/firestoreRegistros";
import { traduzirErro } from "@/servicos/mensagensErro";

type Resultado = { ok: true } | { ok: false; mensagem: string };

type RegistrosContextoTipo = {
  registros: Registro[];
  carregando: boolean;
  erro: string;
  adicionar: (dados: DadosRegistro) => Promise<Resultado>;
  editar: (id: string, dados: DadosRegistro) => Promise<Resultado>;
  remover: (id: string) => Promise<Resultado>;
};

const RegistrosContexto = createContext<RegistrosContextoTipo | null>(null);

export function RegistrosProvider({ children }: { children: React.ReactNode }) {
  const { usuario } = useSessao();
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (!usuario) {
      setRegistros([]);
      setCarregando(false);
      return;
    }

    setCarregando(true);
    const cancelar = observarRegistros(
      usuario.uid,
      (novosRegistros) => {
        setRegistros(novosRegistros);
        setErro("");
        setCarregando(false);
      },
      (erroRecebido) => {
        setErro(traduzirErro(erroRecebido?.code));
        setCarregando(false);
      }
    );

    return cancelar;
  }, [usuario]);

  async function adicionar(dados: DadosRegistro): Promise<Resultado> {
    if (!usuario) return { ok: false, mensagem: "Nenhum usuário autenticado." };
    try {
      await criarRegistro(usuario.uid, dados);
      return { ok: true };
    } catch (erroCapturado: any) {
      return { ok: false, mensagem: traduzirErro(erroCapturado?.code) };
    }
  }

  async function editar(id: string, dados: DadosRegistro): Promise<Resultado> {
    if (!usuario) return { ok: false, mensagem: "Nenhum usuário autenticado." };
    try {
      await atualizarRegistro(usuario.uid, id, dados);
      return { ok: true };
    } catch (erroCapturado: any) {
      return { ok: false, mensagem: traduzirErro(erroCapturado?.code) };
    }
  }

  async function remover(id: string): Promise<Resultado> {
    if (!usuario) return { ok: false, mensagem: "Nenhum usuário autenticado." };
    try {
      await excluirRegistro(usuario.uid, id);
      return { ok: true };
    } catch (erroCapturado: any) {
      return { ok: false, mensagem: traduzirErro(erroCapturado?.code) };
    }
  }

  return (
    <RegistrosContexto.Provider value={{ registros, carregando, erro, adicionar, editar, remover }}>
      {children}
    </RegistrosContexto.Provider>
  );
}

export function useRegistros() {
  const contexto = useContext(RegistrosContexto);
  if (!contexto) {
    throw new Error("useRegistros precisa ser usado dentro de um RegistrosProvider");
  }
  return contexto;
}
