import { auth, db } from "@/Services/fireBaseConfig";
import { onAuthStateChanged, updatePhoneNumber, updateProfile } from "firebase/auth";
import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
  } from "firebase/firestore";


export async function addUsuario(novoUsuario: any) {
    try {
      const docRef = await addDoc(collection(db, "usuario"), novoUsuario);
      console.log("Usuário adicionado com ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  export async function getUsuario() {
    try {
      const querySnapshot = await getDocs(collection(db, "usuario"));
      const users: any = [];
      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
      return users;
    } catch (e) {
      console.error("Erro ao obter documentos: ", e);
      return []; // Retorna um array vazio em caso de erro
    }
  }
  export async function updateUsuario(usuario: any) {
    try {
      //console.log(RequisicaoDeCompra);
      const docRef = doc(db, "usuario", usuario.id);
      const updateTelefone = {
        telefone: usuario.telefone,
      };
      await updateDoc(docRef, updateTelefone);
      console.log("Document updated with ID: ", usuario.id);
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  }

  export async function getUserAuthentication() {
    return new Promise((resolve, reject) => {
      try {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            const userData = user;
            //console.log("Usuário autenticado: ", userData);
            resolve(userData);
          } else {
            resolve(null); // Nenhum usuário autenticado
          }
        });
      } catch (e) {
        reject("Erro na autenticação: " + e);
      }
    });
  }

  export async function updateUserAuthentication(infoUser: any) {
    try {
        const user = auth.currentUser;

        if (!user) {
            throw new Error("Usuário não autenticado.");
        }

        // Atualiza displayName e photoURL
        await updateProfile(user, {
            displayName: infoUser.nome,
            photoURL: infoUser.photoURL,
        });
        console.log("Usuário atualizado com sucesso");
    } catch (e: any) {
        console.error("Erro ao atualizar usuário: ", e.message);
    }
}


  
