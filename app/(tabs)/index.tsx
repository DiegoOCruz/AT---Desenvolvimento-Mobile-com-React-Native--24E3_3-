import { Redirect, router } from "expo-router";
import { Image, StyleSheet, View } from "react-native";
import { useSession } from "../ctx";
import { Button, Text } from "react-native-paper";
import { Grid, TopBar } from "@/components";
import Topbar from "@/components/navigation/TopBar";
import { useEffect } from "react";

export default function HomeScreen() {
  const { userEmail } = useSession();

  useEffect(() => {
    //console.log(userEmail);
    
  },[]);
  
  return (
    <Grid
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <Grid>
        <Topbar title="Home" />
      </Grid>
      <Grid style={styles.container}>
        <Image
          source={require("../../assets/images/ACME_Logo.png")}
          style={{
            width: 250,
            height: 200,
            resizeMode: "contain",
          }}
        />
        <Text style={styles.title}>ACME - SISTEMA DE COMPRAS</Text>
      </Grid>
    </Grid>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5", // para garantir que o fundo esteja visível
    width: "100%", // ocupa toda a largura da tela
  },
  content: {
    width: "90%", // ocupa 90% da largura da tela
    alignItems: "center", // centraliza o conteúdo horizontalmente
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 40,
    color: "rgb(32, 26, 25)",
  },
  textInput: {
    height: 50,
    width: "100%", // ocupa toda a largura do content
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
    width: "100%", // o botão também ocupa toda a largura
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
    color: "rgb(32, 26, 25)",
    fontSize: 16,
    fontWeight: "500",
  },
});
