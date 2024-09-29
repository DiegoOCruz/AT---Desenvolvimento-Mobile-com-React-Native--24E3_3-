import { router } from "expo-router";
import {
  IdTokenResult,
  signInWithEmailAndPassword,
  UserCredential,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
} from "@firebase/auth";
import { auth } from "./fireBaseConfig";
import { addUsuario } from "@/Infra/usuarios";

const login = async (
  email: string,
  password: string,
  setSession: any,
  setUserEmail: any
) => {
  //console.log(email, password);
  try {
    const response: UserCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user: any = response.user.toJSON();
    setSession(user.stsTokenManager.accessToken);
    setUserEmail(user);
    //console.log(user);
    router.replace("/(tabs)");
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    router.replace("/login");
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};

const createLogin = async (
  email: string,
  password: string,
  nome: string
) => {
  //console.log(auth)
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user: any = response.user;
    //setSession(user.stsTokenManager.accessToken);
    await updateProfile(user, {
      displayName: nome,
    });
    const newUser = {
      nome: user.displayName,
      email: user.email,
      ativo: true,
      telefone: "",
    };
    await addUsuario(newUser);

    // if (user) {
    //   await login(email, password, setSession, setUserEmail);
    // }

    router.replace("/login");
    
  } catch (error: any) {
    console.log("Sign up failed:", error);
    //alert("Sign up failed: " + error.message);
  }
};

export { login, logout, createLogin };
