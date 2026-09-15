# CP4 — CheckPoint 4 (App Mobile com Autenticação Firebase)

**Curso:** Tecnologia em Desenvolvimento de Sistemas – 2TDS
**Componente Curricular:** Mobile Application Development
**Professor:** Fernando Pinéo

## Integrantes
- Pedro Sakai Silva Zambaca - RM565956 - 2TDSPF

## Descrição do projeto
**CP4** é um app mobile em **React Native + Expo Router**, com
autenticação via **Firebase Authentication** e persistência de sessão em
**AsyncStorage**. O projeto segue a estrutura de rotas por arquivos
apresentada em aula, mas organiza a lógica de autenticação num contexto
próprio (`SessaoContexto`) em vez de espalhar chamadas ao Firebase em cada
tela, e usa componentes reutilizáveis (`Campo`, `BotaoAcao`, `Aviso`) para
manter a interface consistente.

Funcionalidades implementadas:
- Cadastro (nome, e-mail, senha, confirmação) com validações de campos
  obrigatórios, formato de e-mail e senhas coincidentes
- Login com e-mail e senha, com mensagens de erro
- Persistência de sessão via AsyncStorage — o app mantém o usuário logado
  mesmo após fechar e reabrir
- Logout, removendo a sessão local e encerrando a sessão no Firebase
- Recuperação de senha ("Esqueci minha senha"), com feedback padronizado
- Exclusão de conta, com confirmação prévia via `Alert`
- Bloqueio de rotas autenticadas para quem não está logado (grupo de rotas
  `(protegido)`)


## Tecnologias utilizadas
- [React Native](https://reactnative.dev/) + [Expo](https://expo.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/) (rotas por arquivos)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
- TypeScript

## Estrutura do projeto
```
CP4/
├── app/                          # Rotas (Expo Router)
│   ├── _layout.tsx               # Layout 
│   ├── index.tsx                 # Redireciona para /login ou /inicio
│   ├── (auth)/                   # Grupo de rotas públicas
│   │   ├── _layout.tsx
│   │   ├── login.tsx
│   │   ├── cadastro.tsx
│   │   └── recuperar-senha.tsx
│   └── (protegido)/               # Grupo de rotas autenticadas
│       ├── _layout.tsx
│       ├── inicio.tsx
│       └── perfil.tsx            # Dados da conta, logout, exclusão de conta
└── src/
    ├── contexto/
    │   └── SessaoContexto.tsx    # Lógica de autenticação
    ├── servicos/
    │   ├── firebase.ts           # Inicialização do Firebase Authentication
    │   ├── sessaoLocal.ts        # Leitura/gravação da sessão no AsyncStorage
    │   └── mensagensErro.ts      # Tradução dos erros do Firebase
    ├── componentes/
    │   ├── Campo.tsx             # Input com rótulo e mensagem de erro
    │   ├── BotaoAcao.tsx         # Botão com estado de carregamento
    │   └── Aviso.tsx             # Banner de erro/sucesso
    └── tema/
        └── cores.ts              # Paleta de cores do app
```

## Instruções para instalação e execução

### Pré-requisitos
- [Node.js](https://nodejs.org/) (LTS)
- Um projeto criado no [Firebase Console](https://console.firebase.google.com)
  com o provedor **E-mail/senha** habilitado em
  *Authentication > Sign-in method*
- App **Expo Go** instalado no celular (ou emulador Android/iOS configurado)

### 1. Instalar dependências
```bash
cd CP4
npm install
```

### 2. Configurar o Firebase
Abra `src/servicos/firebase.ts` e substitua os valores de exemplo pelas
credenciais do seu projeto (disponíveis em *Configurações do projeto >
Seus apps > app Web*):

```ts
const firebaseConfig = {
  apiKey: "SUA_API_KEY_AQUI",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJETO",
  storageBucket: "SEU_PROJETO.firebasestorage.app",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID",
};
```

### 3. Executar o projeto
```bash
npx start
```
Escaneie o QR code com o app **Expo Go** (Android/iOS) ou pressione `a`
para abrir no emulador Android
