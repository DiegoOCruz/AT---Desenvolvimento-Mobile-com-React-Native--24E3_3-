import React from "react";
import { DataTable as DT, IconButton } from "react-native-paper";
import { View, StyleSheet, TextStyle } from "react-native";
import Text from "../Text";

interface ReusableDataTableProps {
  data: Array<any>;
  onInfoPress: (id: string) => void;
}

const getStatusStyle = (status: string): TextStyle => ({
  color: status === "aberta" ? "#B22222" : status === "em cotacao" ? "#DAA520" : "#32CD32",
});

// Função para agrupar os dados por status
const groupByStatus = (data: Array<any>) => {
  return data.reduce((groups, item) => {
    const status = item.status;
    if (!groups[status]) {
      groups[status] = [];
    }
    groups[status].push(item);
    return groups;
  }, {} as Record<string, Array<any>>);
};

const DataTable: React.FC<ReusableDataTableProps> = ({ data, onInfoPress }) => {
  const groupedData = groupByStatus(data);

  // Definindo a ordem dos status: aberta, em cotacao, fechada
  const orderedStatuses = ["aberta", "em cotacao", "fechada"];

  return (
    <View>
      {orderedStatuses.map((status, statusIndex) => (
        groupedData[status] && ( // Verifica se há dados para o status
          <View key={statusIndex}>
            {/* Título do grupo baseado no status */}
            <Text style={[styles.statusTitle, getStatusStyle(status)]}>{status.toUpperCase()}</Text>

            <DT>
              <DT.Header>
                <DT.Title style={styles.header}>Data</DT.Title>
                <DT.Title style={styles.header}>Quantidade</DT.Title>
                <DT.Title style={styles.header}>Produto</DT.Title>
                <DT.Title style={styles.header}>Status</DT.Title>
                <DT.Title style={styles.header}>+ Info</DT.Title>
              </DT.Header>

              {groupedData[status].map((item, index) => (
                <DT.Row key={index}>
                  <DT.Cell style={styles.cell}>
                    <Text style={styles.cellText}>{item.data}</Text>
                  </DT.Cell>
                  <DT.Cell style={styles.cell}>
                    <Text style={styles.cellText}>{item.quantidade}</Text>
                  </DT.Cell>
                  <DT.Cell style={styles.cell}>
                    <Text style={styles.cellText}>{item.produto}</Text>
                  </DT.Cell>
                  <DT.Cell style={styles.cell}>
                    <Text style={[styles.cellText, getStatusStyle(item.status)]}>
                      {item.status}
                    </Text>
                  </DT.Cell>
                  <DT.Cell style={styles.cell}>
                    <IconButton onPress={() => onInfoPress(item.id)} icon="information" />
                  </DT.Cell>
                </DT.Row>
              ))}
            </DT>
          </View>
        )
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: "center", // Centraliza o título horizontalmente
    textAlign: "center",
    fontWeight: "bold",
  },
  cell: {
    justifyContent: "center", // Centraliza o conteúdo horizontalmente
    alignItems: "center", // Centraliza o conteúdo verticalmente
    height: 60, // Altura das células
  },
  cellText: {
    textAlign: "center", // Centraliza o texto dentro da célula
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center", // Centraliza o título de cada status
  },
});

export default DataTable;
