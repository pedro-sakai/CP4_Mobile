import AsyncStorage from "@react-native-async-storage/async-storage";

const CHAVE_SESSAO = "@cp4:sessao";

export type SessaoSalva = {
  uid: string;
  email: string | null;
  nome: string | null;
};

export async function gravarSessao(dados: SessaoSalva): Promise<void> {
  await AsyncStorage.setItem(CHAVE_SESSAO, JSON.stringify(dados));
}

export async function lerSessao(): Promise<SessaoSalva | null> {
  const bruto = await AsyncStorage.getItem(CHAVE_SESSAO);
  return bruto ? (JSON.parse(bruto) as SessaoSalva) : null;
}

export async function limparSessao(): Promise<void> {
  await AsyncStorage.removeItem(CHAVE_SESSAO);
}
