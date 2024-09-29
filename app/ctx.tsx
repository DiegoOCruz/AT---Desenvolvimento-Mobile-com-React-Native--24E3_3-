import { useContext, createContext, type PropsWithChildren, useState } from 'react';
import { useStorageState } from './useStorageState';
import { router } from 'expo-router';
import {firebaseApp} from "@/Services/fireBaseConfig";
import {createLogin, login, logout} from "@/Services/auth";



const AuthContext = createContext<{
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  signUp: (email: string, password: string, nome: string) => void;
  setId: (id: string | null) => void; //id cotaçao
  id?: string | null; //id cotaçao
  setUserEmail: (email: string | null) => void;
  userEmail?: string | null;
  firebaseApp?: typeof firebaseApp | null;
  session?: string | null;
  isLoading: boolean;
  isLoadingEmail: boolean;
}>({
  signIn: (email: string, password: string) => null,
  signOut: () => null,
  signUp: (email: string, password: string, nome: string) => null,
  setId: () => null, //id cotaçao
  firebaseApp: firebaseApp,
  id: null, //id cotaçao
  session: null,
  setUserEmail: () => null,
  userEmail: null,
  isLoading: false,
  isLoadingEmail: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');
  const [id, setId] = useState<string | null>(null);
  const [[isLoadingEmail, userEmail], setUserEmail] = useStorageState('email');

  return (
    <AuthContext.Provider
      value={{
        signIn: (email: string, password: string) => {
          return login(email, password, setSession, setUserEmail);
        },
        signOut: () => {
          logout();
          setSession(null);
        },
        signUp: (email: string, password: string, nome: string) => {
          // Perform sign-up logic here
          //setSession('xxx');
          //router.replace('/(tabs)');
          return createLogin(email, password, nome);
        },
        firebaseApp: firebaseApp,
        setId,
        id,
        session,
        isLoading,
        userEmail,
        isLoadingEmail,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
