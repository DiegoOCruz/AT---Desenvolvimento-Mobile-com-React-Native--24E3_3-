import { Button, Grid, Text, TopBar } from "@/components";
import { useSession } from "./ctx";
import { useEffect, useState } from "react";
import {
  deleteCotacao,
  deleteRequisicaoDeCompra,
  getCotacao,
  getRequisicaoDeCompra,
} from "@/Infra/getRequisicoes";
import { ScrollView, StyleSheet, View } from "react-native";
import { DataTable } from "react-native-paper";
import { Requisicao } from "@/intefaces/item";
import { Alert } from "react-native";
import { router } from "expo-router";

export default function FormScreen() {
  const [list, setList] = useState<Requisicao[]>([]);
  const { id, userEmail } = useSession();

  const getList = async () => {
    const data = await getCotacao();
    const data2 = await getRequisicaoDeCompra();
    // Combina data e data2
    setList([...data, ...data2]);
  };

  useEffect(() => {
    getList();
  }, []);

  const showConfirm = (id: string) => {
    Alert.alert(
      "Confirmação",
      "Você tem certeza que deseja excluir esta requisição?",
      [
        {
          text: "Cancelar",
        },
        {
          text: "Excluir",
          onPress: () => {
            deleteRequisicaoDeCompra(id);
            router.push("/(tabs)/minhasRequisicoes");
          },
        },
      ]
    );
  };

  const showConfirm2 = (id: string) => {
    Alert.alert(
      "Confirmação",
      "Você tem certeza que deseja excluir esta requisição?",
      [
        {
          text: "Cancelar",
        },
        {
          text: "Excluir",
          onPress: () => {
            deleteCotacao(id);
            router.push("/(tabs)/minhasRequisicoes");
          },
        },
      ]
    );
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TopBar title="Requisições" back={true} menu={false} />
        {list
          .filter((item: any) => item.id === id)
          .map((item) => (
            <View key={item.id} style={styles.card}>
              <Text style={styles.title}>
                Requisição ID: {item.id} - Usuário: {item.solicitante.nome}
              </Text>
              <Text style={styles.text}>Data: {item.data}</Text>
              <Text style={styles.text}>Produto: {item.produto}</Text>
              <Text style={styles.text}>Quantidade: {item.quantidade}</Text>
              <Text style={styles.text}>Prioridade: {item.prioridade}</Text>
              <Text style={styles.text}>
                Observações:{" "}
                {item.observacoes
                  ? item.observacoes
                  : " Não constam observações"}
              </Text>
              {item.status != "aberta" && (
                <Text style={styles.text}>
                  Observações Admin:{" "}
                  {item.obsAdmin ? item.obsAdmin : " Não constam observações"}
                </Text>
              )}

              <Text style={styles.text}>Status: {item.status}</Text>

              {/* Exibe as cotações em uma DataTable */}
              {item.cotacoes && (
                <>
                <View style={styles.cotacaoContainer}>
                  <Text style={styles.cotacaoTitle}>Cotações:</Text>
                  <DataTable style={styles.table}>
                    <DataTable.Header style={styles.tableHeader}>
                      <DataTable.Title style={styles.headerText}>
                        Fornecedor
                      </DataTable.Title>
                      <DataTable.Title numeric style={styles.headerText}>
                        Quantidade
                      </DataTable.Title>
                      <DataTable.Title numeric style={styles.headerText}>
                        Preço
                      </DataTable.Title>
                      <DataTable.Title numeric style={styles.headerText}>
                        Total
                      </DataTable.Title>
                    </DataTable.Header>

                    {Object.keys(item.cotacoes).map((key) => (
                      <DataTable.Row key={key} style={styles.tableRow}>
                        <DataTable.Cell>
                          {item.cotacoes[key].fornecedor}
                        </DataTable.Cell>
                        <DataTable.Cell numeric>
                          {parseFloat(
                            item.cotacoes[key].total / item.cotacoes[key].preco
                          ).toFixed(2)}
                        </DataTable.Cell>
                        <DataTable.Cell numeric>
                          R$ {parseFloat(item.cotacoes[key].preco).toFixed(2)}
                        </DataTable.Cell>
                        <DataTable.Cell numeric>
                          R$ {item.cotacoes[key].total}
                        </DataTable.Cell>
                      </DataTable.Row>
                    ))}
                  </DataTable>
                  <Grid style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 16,
                    gap: 16,
                  }}>
                    <Button
                      mode="contained"
                      icon="delete"
                      onPress={() => {
                        showConfirm2(item.id);
                      }}
                    >
                      Excluir
                    </Button>
                  </Grid>
                </View>
                <Grid style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 16,
                  gap: 16,
                }}>
                  <Text style={{
                    fontSize: 12,
                    color: "#555",
                    marginBottom: 4,
                  }}>
                    ***Conforme Regras de Negócio do sistema, após o inicio do processo de cotação, não é possivel alterar a requisição, somente excluir.
                  </Text>
                </Grid>
                </>
              )}
            </View>
            
          ))}
        {list
          .filter((item: any) => item.id === id && item.status === "aberta")
          .map((item, index) => (
            <Grid
              key={index}
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 16,
                gap: 16,
              }}
            >
              <Button
                mode="contained"
                icon="pencil"
                onPress={() => {
                  router.replace("/edit");
                }}
              >
                Editar
              </Button>

              <Button
                mode="contained"
                icon="delete"
                onPress={() => {
                  showConfirm(item.id);
                }}
              >
                Excluir
              </Button>
            </Grid>
          ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  cotacaoContainer: {
    marginTop: 16,
  },
  cotacaoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  table: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    overflow: "hidden",
  },
  tableHeader: {
    backgroundColor: "#B22222",
    color: "white",
  },
  headerText: {
    color: "#fff",
    fontWeight: "bold",
  },
  tableRow: {
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
});
