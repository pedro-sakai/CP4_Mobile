import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { cores } from "@/tema/cores";
import { Registro } from "@/servicos/firestoreRegistros";

type Props = {
  registro: Registro;
  aoEditar: () => void;
  aoExcluir: () => void;
};

function formatarValor(valor: number) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function ItemRegistro({ registro, aoEditar, aoExcluir }: Props) {
  return (
    <View style={estilos.cartao}>
      <View style={estilos.cabecalho}>
        <Text style={estilos.descricao}>{registro.descricao}</Text>
        <Text style={estilos.valor}>{formatarValor(registro.valor)}</Text>
      </View>

      <View style={estilos.linhaDetalhes}>
        <Text style={estilos.categoria}>{registro.categoria}</Text>
        <Text style={estilos.data}>{registro.data}</Text>
      </View>

      <View style={estilos.acoes}>
        <TouchableOpacity style={estilos.botaoAcao} onPress={aoEditar}>
          <Text style={estilos.textoEditar}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={estilos.botaoAcao} onPress={aoExcluir}>
          <Text style={estilos.textoExcluir}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  cartao: {
    backgroundColor: cores.superficie,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },
  cabecalho: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  descricao: {
    color: cores.texto,
    fontSize: 16,
    fontWeight: "700",
    flexShrink: 1,
    marginRight: 8,
  },
  valor: {
    color: cores.destaque,
    fontSize: 16,
    fontWeight: "700",
  },
  linhaDetalhes: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  categoria: {
    color: cores.textoSuave,
    fontSize: 13,
  },
  data: {
    color: cores.textoSuave,
    fontSize: 13,
  },
  acoes: {
    flexDirection: "row",
    gap: 16,
    borderTopWidth: 1,
    borderTopColor: cores.borda,
    paddingTop: 10,
  },
  botaoAcao: {
    paddingVertical: 4,
  },
  textoEditar: {
    color: cores.destaque,
    fontSize: 14,
    fontWeight: "600",
  },
  textoExcluir: {
    color: cores.perigo,
    fontSize: 14,
    fontWeight: "600",
  },
});
