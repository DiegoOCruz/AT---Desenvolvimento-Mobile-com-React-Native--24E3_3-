import { Button, Grid, Snackbar, Text, TextInput, TopBar } from "@/components";
import { addRequisicaoDeCompra } from "@/Infra/getRequisicoes";
import { getProducts } from "@/Infra/produtos";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-paper-dropdown";
import { useSession } from "../ctx";
import verifyConnection from "@/Infra/conection";

export default function CriarRequisicoesScreen() {
  const { userEmail } = useSession();

  const [produto, setProduto] = useState<string>();
  const [options, setOptions] = useState<any[]>([]);
  const [prioridade, setPrioridade] = useState<string>();
  const [quantidade, setQuantidade] = useState<string>();
  const [observacoes, setObservacoes] = useState<string>();
  const [message, setMessage] = useState<string | null>(null);

  const loadProdutos = async () => {
    const prod = await getProducts();
    const updatedOptions = prod.map((produto: any) => ({
      label: produto.nome,
      value: produto.nome,
    }));
    setOptions(updatedOptions); // Atualizando o estado das opções
  };

  const OPTIONS = [
    { label: "Alta", value: "Alta" },
    { label: "Média", value: "Média" },
    { label: "Baixa", value: "Baixa" },
  ];

  const OPTIONS_2 = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "+ 5", value: "+ 5" },
  ];
  const clearFields = () => {
    setProduto("");
    setPrioridade("");
    setQuantidade("");
    setObservacoes("");
  };

  const handleSubmit = async () => {
    if (!produto || !prioridade || !quantidade) {
      setMessage("Preencha todos os campos obrigatórios");
      return false;
    }
    if (!verifyConnection()){
      setMessage("Sem conexão com a internet");
      return false;
    }else{
      const solicitante = {
        nome: userEmail.displayName,
        email: userEmail.email,
        id: userEmail.uid,
        photoURL: userEmail.photoURL ? userEmail.photoURL : null,
      };
      const requisicaoDeCompra = {
        data: new Date().toLocaleDateString("pt-BR"),
        prioridade: prioridade,
        produto: produto,
        quantidade: quantidade,
        observacoes: observacoes,
        status: "aberta",
        solicitante: solicitante,
      };
      await addRequisicaoDeCompra(requisicaoDeCompra);
      clearFields();
      //console.log(requisicaoDeCompra);
    }
  };

  useEffect(() => {
    loadProdutos();
  }, []);

  return (
    <Grid>
      <TopBar title="Nova Requisição" />
      <Text style={styles.title}>Requisições de Compra</Text>
      <Grid style={styles.card}>
        <Text>Informe os Produtos:</Text>
        <Dropdown
          label="Prioridade"
          placeholder="Selecione a prioridade"
          options={OPTIONS}
          value={prioridade}
          onSelect={setPrioridade}
        />
        {options.length > 0 ? (
          <Dropdown
            label="Produtos"
            placeholder="Selecione um produto"
            options={options}
            value={produto}
            onSelect={setProduto}
          />
        ) : (
          <TextInput 
          label="Produtos"
          value={produto}
          onChangeText={(text: string) => setProduto(text)}
          />
        )}
        <Dropdown
          label="Quantidade"
          placeholder="Selecione a quantidade"
          options={OPTIONS_2}
          value={quantidade}
          onSelect={setQuantidade}
        />
        <TextInput
          label="Observações"
          value={observacoes}
          onChangeText={(text: string) => setObservacoes(text)}
          multiline={true}
          numberOfLines={4}
        />
        <Button
          icon="send"
          mode="contained"
          onPress={() => {
            handleSubmit();
          }}
        >
          Enviar Requisição
        </Button>
      </Grid>
      <Snackbar
          visible={message !== null}
          onDismiss={() => setMessage(null)}
          duration={5000}
          text={message}
        />
    </Grid>
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
    textAlign: "center",
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
    padding: 16,
    gap: 16,
  },
});
