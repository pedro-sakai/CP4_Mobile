import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebase";

export type Registro = {
  id: string;
  descricao: string;
  valor: number;
  categoria: string;
  data: string;
};

export type DadosRegistro = {
  descricao: string;
  valor: number;
  categoria: string;
  data: string;
};

function colecaoDoUsuario(uid: string) {
  return collection(db, "usuarios", uid, "registros");
}

export function observarRegistros(
  uid: string,
  aoAtualizar: (registros: Registro[]) => void,
  aoFalhar: (erro: any) => void
) {
  const consulta = query(colecaoDoUsuario(uid), orderBy("criadoEm", "desc"));

  return onSnapshot(
    consulta,
    (instantaneo) => {
      const registros: Registro[] = instantaneo.docs.map((documento) => {
        const dados = documento.data();
        return {
          id: documento.id,
          descricao: dados.descricao,
          valor: dados.valor,
          categoria: dados.categoria,
          data: dados.data,
        };
      });
      aoAtualizar(registros);
    },
    aoFalhar
  );
}

export async function criarRegistro(uid: string, dados: DadosRegistro): Promise<void> {
  await addDoc(colecaoDoUsuario(uid), {
    ...dados,
    criadoEm: serverTimestamp(),
  });
}

export async function atualizarRegistro(
  uid: string,
  id: string,
  dados: DadosRegistro
): Promise<void> {
  await updateDoc(doc(db, "usuarios", uid, "registros", id), { ...dados });
}

export async function excluirRegistro(uid: string, id: string): Promise<void> {
  await deleteDoc(doc(db, "usuarios", uid, "registros", id));
}

export async function excluirTodosRegistros(uid: string): Promise<void> {
  const instantaneo = await getDocs(colecaoDoUsuario(uid));
  await Promise.all(instantaneo.docs.map((documento) => deleteDoc(documento.ref)));
}
