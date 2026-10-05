import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

import Campo from "@/componentes/Campo";
import SeletorCategoria from "@/componentes/SeletorCategoria";
import BotaoAcao from "@/componentes/BotaoAcao";
import Aviso from "@/componentes/Aviso";
import { DadosRegistro } from "@/servicos/firestoreRegistros";

type Props = {
  valoresIniciais?: DadosRegistro;
  textoBotao: string;
  processando: boolean;
  erroGeral: string;
  aoConfirmar: (dados: DadosRegistro) => void;
};

export default function FormularioRegistro({
  valoresIniciais,
  textoBotao,
  processando,
  erroGeral,
  aoConfirmar,
}: Props) {
  const [descricao, setDescricao] = useState(valoresIniciais?.descricao ?? "");
  const [valor, setValor] = useState(
    valoresIniciais ? String(valoresIniciais.valor).replace(".", ",") : ""
  );
  const [categoria, setCategoria] = useState(valoresIniciais?.categoria ?? "");
  const [data, setData] = useState(valoresIniciais?.data ?? "");

  const [erros, setErros] = useState<Record<string, string>>({});

  function camposValidos() {
    const proximosErros: Record<string, string> = {};

    if (!descricao.trim()) proximosErros.descricao = "Informe uma descrição.";

    const valorNumerico = Number(valor.replace(",", "."));
    if (!valor.trim()) proximosErros.valor = "Informe o valor.";
    else if (Number.isNaN(valorNumerico) || valorNumerico <= 0)
      proximosErros.valor = "Informe um valor numérico maior que zero.";

    if (!categoria) proximosErros.categoria = "Selecione uma categoria.";

    if (!data.trim()) proximosErros.data = "Informe a data.";

    setErros(proximosErros);
    return Object.keys(proximosErros).length === 0;
  }

  function handleConfirmar() {
    if (!camposValidos()) return;

    aoConfirmar({
      descricao: descricao.trim(),
      valor: Number(valor.replace(",", ".")),
      categoria,
      data: data.trim(),
    });
  }

  return (
    <ScrollView contentContainerStyle={estilos.conteudo}>
      <Campo
        rotulo="Descrição"
        placeholder="Ex: Almoço no restaurante"
        value={descricao}
        onChangeText={setDescricao}
        erro={erros.descricao}
      />
      <Campo
        rotulo="Valor (R$)"
        placeholder="Ex: 45,90"
        keyboardType="decimal-pad"
        value={valor}
        onChangeText={setValor}
        erro={erros.valor}
      />
      <SeletorCategoria selecionada={categoria} aoSelecionar={setCategoria} erro={erros.categoria} />
      <Campo
        rotulo="Data"
        placeholder="DD/MM/AAAA"
        value={data}
        onChangeText={setData}
        erro={erros.data}
      />

      {erroGeral ? <Aviso tipo="erro" mensagem={erroGeral} /> : null}

      <BotaoAcao texto={textoBotao} onPress={handleConfirmar} carregando={processando} />
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  conteudo: {
    flexGrow: 1,
    padding: 24,
  },
});
