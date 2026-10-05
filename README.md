# CP5 — CheckPoint 5 (App Mobile com Autenticação e Cloud Firestore)

**Curso:** Tecnologia em Desenvolvimento de Sistemas – 2TDS
**Componente Curricular:** Mobile Application Development
**Professor:** Fernando Pinéo

## Integrantes
- Pedro Sakai Silva Zambaca - RM565956 - 2TDSPF

## Tema do aplicativo
**Controle de gastos.** O usuário autenticado cadastra seus próprios
registros de gastos (descrição, valor, categoria e data), consulta a lista
com o total gasto, edita e exclui registros — tudo salvo no Cloud
Firestore, isolado por usuário.

## Descrição do projeto
Este projeto dá continuidade ao app de autenticação desenvolvido no
CheckPoint 4 (login, cadastro, logout, recuperação de senha, exclusão de
conta e persistência de sessão via AsyncStorage, com Firebase
Authentication), adicionando o **Cloud Firestore** como banco de dados
para as operações de CRUD.

A lógica de autenticação continua centralizada em `SessaoContexto`, e a
lógica dos registros de gastos foi organizada de forma equivalente em
`RegistrosContexto`, que mantém a lista de registros sempre sincronizada
com o Firestore em tempo real (via `onSnapshot`) e expõe funções simples
de `adicionar`, `editar` e `remover` para as telas usarem, sem que elas
precisem conhecer detalhes do Firebase.

Funcionalidades implementadas:
- Cadastro, login, logout, recuperação de senha e exclusão de conta
  (Firebase Authentication), mantidos do CheckPoint 4
- Persistência de sessão via AsyncStorage
- Cadastro de registros de gastos no Firestore (descrição, valor,
  categoria, data), com validação de campos obrigatórios e valor numérico
- Listagem dos registros em tempo real, com total gasto calculado e
  mensagem de lista vazia
- Edição de um registro existente, com formulário pré-preenchido
- Exclusão de um registro, com confirmação prévia
- Cada usuário só enxerga e só consegue alterar os próprios registros —
  isolamento garantido pela estrutura de subcoleções e pelas regras de
  segurança do Firestore
- Ao excluir a conta, os registros do usuário também são removidos do
  Firestore antes da exclusão do usuário no Authentication

## Tecnologias utilizadas
- [React Native](https://reactnative.dev/) + [Expo](https://expo.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/) (rotas por arquivos)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Cloud Firestore](https://firebase.google.com/docs/firestore)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
- TypeScript

## Estrutura do Firestore
Cada usuário autenticado possui sua própria subcoleção de registros,
identificada pelo `uid` do Firebase Authentication:

```
usuarios (coleção)
└── {uid} (documento, um por usuário)
    └── registros (subcoleção)
        ├── {registroId}
        │     ├── descricao: string
        │     ├── valor: number
        │     ├── categoria: string
        │     ├── data: string
        │     └── criadoEm: timestamp
        ├── {registroId}
        └── {registroId}
```

As regras de segurança (arquivo `firestore.rules`, na raiz do projeto)
garantem que um usuário só pode ler ou escrever nos documentos dentro da
sua própria subcoleção:

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /usuarios/{uid}/registros/{registroId} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```

## Estrutura do projeto
```
CP5/
├── app/
│   ├── _layout.tsx
│   ├── index.tsx
│   ├── (auth)/
│   │   ├── _layout.tsx
│   │   ├── login.tsx
│   │   ├── cadastro.tsx
│   │   └── recuperar-senha.tsx
│   └── (protegido)/
│       ├── _layout.tsx           # Envolve as rotas com RegistrosProvider
│       ├── inicio.tsx
│       ├── perfil.tsx            # Dados da conta, logout, exclusão de conta
│       └── registros/
│           ├── index.tsx         # Listagem dos registros + total gasto
│           ├── novo.tsx          # Cadastro de registro
│           └── [id].tsx          # Edição de um registro existente
├── firestore.rules               # Regras de segurança do Firestore
└── src/
    ├── contexto/
    │   ├── SessaoContexto.tsx    # Lógica de autenticação
    │   └── RegistrosContexto.tsx # CRUD e escuta em tempo real dos registros
    ├── servicos/
    │   ├── firebase.ts           # Inicialização do Auth + Firestore
    │   ├── firestoreRegistros.ts # Funções de CRUD no Firestore
    │   ├── sessaoLocal.ts        # Leitura/gravação da sessão no AsyncStorage
    │   └── mensagensErro.ts      # Tradução dos erros do Firebase/Firestore
    ├── componentes/
    │   ├── Campo.tsx
    │   ├── BotaoAcao.tsx
    │   ├── Aviso.tsx
    │   ├── SeletorCategoria.tsx  # Chips de categoria do gasto
    │   ├── FormularioRegistro.tsx # Formulário reutilizado no cadastro e na edição
    │   └── ItemRegistro.tsx      # Card de cada gasto na listagem
    └── tema/
        └── cores.ts
```

## Instruções para instalação

### Pré-requisitos
- [Node.js](https://nodejs.org/) (LTS)
- Um projeto no [Firebase Console](https://console.firebase.google.com) com:
  - **Authentication > Sign-in method** → provedor **E-mail/senha** ativado
  - **Firestore Database** criado (modo produção ou teste, tanto faz —
    as regras do arquivo `firestore.rules` é que controlam o acesso)
- App **Expo Go** instalado no celular (ou emulador Android/iOS configurado)

### 1. Instalar dependências
```bash
cd CP5
npm i
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

## Instruções para execução
```bash
npm start
```
Escaneie o QR code com o app **Expo Go** (Android/iOS) ou pressione `a`
para abrir no emulador Android / `i` para o simulador iOS.
