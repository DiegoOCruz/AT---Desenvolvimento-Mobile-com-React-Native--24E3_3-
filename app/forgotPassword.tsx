import { Snackbar, Text, TextInput } from "@/components";
import { auth } from "@/Services/fireBaseConfig";
import { router } from "expo-router";
import { sendPasswordResetEmail } from "firebase/auth";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ForgotPasswordScreen() {
    const [email, setEmail] = useState("");


    const resetSenha = async() => {
    
        if (email === "") {
          alert("Digite um email para recuperar a senha");
          return;
        } else {
  
            try {
              await sendPasswordResetEmail(auth, email);
              alert("Email de recuperação de senha enviado");
            } catch (error: any) {
              console.log(error);
              alert("Falha ao enviar email de recuperação de senha: " + error.message);
            }  
        }
      };

      useEffect(() => {
        
      }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>
                Esqueci minha senha
            </Text>
            <TextInput
                style={styles.textInput}
                placeholder="email"
                value={email}
                onChangeText={setEmail}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={resetSenha}
            >
                <Text style={styles.text}>Resetar Senha</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {router.replace("/login")}}>
          <Text style={styles.switchText}>Já possui uma conta? Login</Text>
        </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      display: "flex",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      fontSize: 28,
      fontWeight: "800",
      marginBottom: 40,
      color:  "rgb(32, 26, 25)",
    },
    textInput: {
      height: 50,
      width: "90%",
      backgroundColor: "#FFFFFF",
      borderColor: "#E8EAF6",
      borderWidth: 2,
      borderRadius: 15,
      marginVertical: 15,
      paddingHorizontal: 25,
      fontSize: 16,
      color: "#3C4858",
      shadowColor: "#9E9E9E",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 4,
    },
    button: {
      width: "90%",
      marginVertical: 15,
      backgroundColor: "#d32f2f",
      padding: 20,
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#d32f2f",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 5,
      elevation: 5,
    },
    text: {
      color: "#FFFFFF",
      fontSize: 18,
      fontWeight: "600",
    },
    switchText: {
      marginTop: 20,
      color:  "rgb(32, 26, 25)",
      fontSize: 16,
      fontWeight: "500",
    },
  });