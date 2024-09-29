// CotacaoTable.tsx
import React from 'react';
import { DataTable } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

interface Cotacao {
  fornecedor: string;
  preco: string;
  total: string;
}

interface CotacaoTableProps {
  cotacoes: { [key: string]: Cotacao };
}

const CotacaoTable: React.FC<CotacaoTableProps> = ({ cotacoes }) => {
  return (
    <View style={styles.container}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Fornecedor</DataTable.Title>
          <DataTable.Title numeric>Quantidade</DataTable.Title>
          <DataTable.Title numeric>Preço</DataTable.Title>
          <DataTable.Title numeric>Total</DataTable.Title>
        </DataTable.Header>

        {Object.keys(cotacoes).map((key) => (
          <DataTable.Row key={key}>
            <DataTable.Cell>{parseFloat(cotacoes[key].total/cotacoes[key].fornecedor)}</DataTable.Cell>
            <DataTable.Cell numeric>R${cotacoes[key].preco}</DataTable.Cell>
            <DataTable.Cell numeric>R${cotacoes[key].total}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
});

export default CotacaoTable;
