export function traduzirErro(codigo: string | undefined): string {
  const dicionario: Record<string, string> = {
    "auth/email-already-in-use": "Este e-mail já está cadastrado.",
    "auth/invalid-email": "Formato de e-mail inválido.",
    "auth/weak-password": "A senha precisa ter pelo menos 6 caracteres.",
    "auth/user-not-found": "E-mail ou senha incorretos.",
    "auth/wrong-password": "E-mail ou senha incorretos.",
    "auth/invalid-credential": "E-mail ou senha incorretos.",
    "auth/too-many-requests":
      "Muitas tentativas seguidas. Aguarde um instante e tente novamente.",
    "auth/network-request-failed": "Sem conexão com a internet. Tente novamente.",
    "auth/requires-recent-login":
      "Por segurança, faça login novamente antes de excluir sua conta.",
  };

  if (codigo && dicionario[codigo]) return dicionario[codigo];
  return "Não foi possível concluir a operação. Tente novamente.";
}
