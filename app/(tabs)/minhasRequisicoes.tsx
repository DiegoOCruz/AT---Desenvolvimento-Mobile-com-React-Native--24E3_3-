import { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { DataTable, Grid, Text, TopBar } from "@/components";
import { useSession } from "../ctx";
import { getCotacao, getRequisicaoDeCompra } from "@/Infra/getRequisicoes";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { ItemIterface } from "@/intefaces/item";

export default function MinhasRequisicoesScreen() {
  const [obj, setObj] = useState<ItemIterface[]>([]);
  const { setId, userEmail } = useSession();

  const fetchData = async () => {
    const data = await getCotacao();

    const filteredData = data.filter(
      (item: ItemIterface) => item.solicitante.email === userEmail.email
    );

    const data2 = await getRequisicaoDeCompra();
    const filteredData2 = data2.filter(
      (item: ItemIterface) => item.solicitante.email === userEmail.email
    );
    const filteredData3 = filteredData2.filter(
      (item: ItemIterface) => item.status === "aberta"
    );
    setObj([...filteredData, ...filteredData3]);
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const handleInfoPress = (id: string) => {
    setId(id);
    router.push("/form");
  };

  return (
    <>
      <ScrollView>
        <Grid>
          <TopBar title="Minhas Requisições" />
          <View style={styles.card}>
            <View style={styles.container}>
              <Text style={styles.title}>
                Requisições de {userEmail.displayName}
              </Text>
              <DataTable data={obj} onInfoPress={handleInfoPress} />
            </View>
          </View>
        </Grid>
      </ScrollView>
      <Grid
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 16,
          gap: 16,
        }}
      >
        <Text
          style={{
            fontSize: 12,
            color: "#555",
            marginBottom: 4,
          }}
        >
          ***Conforme Regras de Negócio do sistema, somente é possível alterar
          requisições em aberto.
        </Text>
      </Grid>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  title: {
    marginBottom: 16,
    fontSize: 20,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
});
