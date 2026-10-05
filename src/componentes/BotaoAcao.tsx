import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import { cores } from "@/tema/cores";

type Variante = "primaria" | "perigo" | "fantasma";

type Props = {
  texto: string;
  onPress: (evento: GestureResponderEvent) => void;
  carregando?: boolean;
  variante?: Variante;
  desabilitado?: boolean;
};

export default function BotaoAcao({
  texto,
  onPress,
  carregando = false,
  variante = "primaria",
  desabilitado = false,
}: Props) {
  const inativo = carregando || desabilitado;

  return (
    <TouchableOpacity
      style={[estilos.base, estilos[variante], inativo && estilos.inativo]}
      onPress={onPress}
      disabled={inativo}
      activeOpacity={0.85}
    >
      {carregando ? (
        <ActivityIndicator color={variante === "fantasma" ? cores.destaque : cores.fundo} />
      ) : (
        <Text
          style={[
            estilos.texto,
            variante === "fantasma" && { color: cores.destaque },
            variante === "perigo" && { color: cores.texto },
          ]}
        >
          {texto}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const estilos = StyleSheet.create({
  base: {
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  primaria: {
    backgroundColor: cores.destaque,
  },
  perigo: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: cores.perigo,
  },
  fantasma: {
    backgroundColor: "transparent",
  },
  inativo: {
    opacity: 0.6,
  },
  texto: {
    color: cores.fundo,
    fontSize: 16,
    fontWeight: "700",
  },
});
