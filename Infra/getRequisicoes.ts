import {
  addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    updateDoc,
  } from "firebase/firestore";
  import { db } from "@/Services/fireBaseConfig";

  export async function getCotacao() {
    //console.log("getCotacao");
    try {
      const querySnapshot = await getDocs(collection(db, "cotacao"));
      //console.log(querySnapshot);
      const cotacao: any = [];
      querySnapshot.forEach((doc) => {
        cotacao.push({ id: doc.id, ...doc.data() });
      });
      return cotacao;
    } catch (e) {
      console.error("Error getting documents: ", e);
    }
  }

  export async function deleteCotacao(id: string) {
    try {
      await deleteDoc(doc(db, "cotacao", id));
      console.log("Document deleted with ID: ", id);
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  }

  export async function getRequisicaoDeCompra() {
    try {
      const querySnapshot = await getDocs(collection(db, "RequisicaoDeCompra"));
      const requisicao: any = [];
      querySnapshot.forEach((doc) => {
        requisicao.push({ id: doc.id, ...doc.data() });
      });
      return requisicao;
    } catch (e) {
      console.error("Error getting documents: ", e);
    }
  }

  export async function deleteRequisicaoDeCompra(id: string) {
    try {
      await deleteDoc(doc(db, "RequisicaoDeCompra", id));
      console.log("Document deleted with ID: ", id);
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  }

  export async function updateRequisicaoDeCompra(RequisicaoDeCompra: any) {
    try {
      //console.log(RequisicaoDeCompra);
      const docRef = doc(db, "RequisicaoDeCompra", RequisicaoDeCompra.id);
      const requisicaoData = {
        produto: RequisicaoDeCompra.produto,
        quantidade: RequisicaoDeCompra.quantidade,
        data: RequisicaoDeCompra.data,
        prioridade: RequisicaoDeCompra.prioridade,
        observacoes: RequisicaoDeCompra.observacoes,
        status: RequisicaoDeCompra.status,
      };
      await updateDoc(docRef, requisicaoData);
      console.log("Document updated with ID: ", RequisicaoDeCompra.id);
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  }

  
export async function addRequisicaoDeCompra(novaRequisicao: any) {
  try {
    const docRef = await addDoc(collection(db, "RequisicaoDeCompra"), novaRequisicao);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}