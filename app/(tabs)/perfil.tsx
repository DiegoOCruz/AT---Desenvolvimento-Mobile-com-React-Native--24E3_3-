import {
  Avatar,
  Button,
  Camera,
  Fab,
  Grid,
  Snackbar,
  TextInput,
} from "@/components";
import Topbar from "@/components/navigation/TopBar";
import { UserInterface } from "@/intefaces/User";
import { useEffect, useRef, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  getUserAuthentication,
  getUsuario,
  updateUserAuthentication,
  updateUsuario,
} from "@/Infra/usuarios";
import { ScrollView } from "react-native";
import { uploadImageToFirebaseStorage } from "@/Services/storange";

export default function PerfilScreen() {
  const [cameraVisible, setCameraVisible] = useState(false);
  const [message, setMessage] = useState(null);
  const cameraRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<UserInterface>({
    photoURL: null,
  });

  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  const [usuario, setUsuario] = useState(null);

  const dados = async () => {
    try {
      const user: any = await getUserAuthentication();
      //setUsuario(user);
      //console.log(user);
      campos(user);
    } catch (error) {
      console.error(error);
    }
  };

  const campos = async (user: any) => {
    Object.keys(user).forEach((key) => {
      if (key === "displayName") {
        //console.log(user[key]);
        setNome(user[key]);
      }
      if (key === "email") {
        //console.log(user[key]);
        setEmail(user[key]);
      }
      if (key === "uid") {
        //console.log(user[key]);
        setId(user[key]);
      }
      if (key === "photoURL") {
        //console.log(user[key]);
        setPhotoURL(user[key]);
      }
    });
    
  };

  const camposTelefone = async () => {
    const userFone = await getUsuario();
    const usuarioEncontrado = userFone.find(
      (user: any) => user.email === email
    );
    //console.log(usuarioEncontrado);
    Object.keys(usuarioEncontrado).forEach((key) => {
      if (key === "telefone") {
        setTelefone(usuarioEncontrado[key]);
      }
    }
    );
  };

  useEffect(() => {
    if (email) {
      camposTelefone();
    }
  }, [email]);

  useEffect(() => {
    dados();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled && result.assets && result.assets.length > 0) {
      // setData((v: any) => ({
      //   ...v,
      //   photoURL: result.assets[0].uri,
      // }));
      const selectedImage = result.assets[0].uri;
      setPhotoURL(selectedImage);
      //console.log(photoURL);
    }
  };

  const onCapture = (photo: any) => {
    // setData((v: any) => ({
    //   ...v,
    //   image: photo.uri,
    // }));
    const selectedImage = photo.uri;
    setPhotoURL(selectedImage);
    //console.log(photoURL);
  };

  const _update = async () => {
    setLoading(true);
    const im = photoURL.split("/");
    //console.log(`${photoURL}-*-*-*-*${nome}-*-*-*-${im[im.length - 1]}`)
    const newImg = await uploadImageToFirebaseStorage(photoURL, email, im[im.length - 1])
    setPhotoURL(newImg);
    const user = {
      nome,
      photoURL,
    };
    //console.log(user);
    await updateUserAuthentication(user);

    const userFone = await getUsuario();
    const usuarioEncontrado = userFone.find(
      (user: any) => user.email === email
    );

    if (usuarioEncontrado) {
      const dadosTelefone = {
        id: usuarioEncontrado.id,
        telefone: telefone,
      };
      console.log(dadosTelefone);
      await updateUsuario(dadosTelefone); 
    }

    dados();
    setMessage("Dados atualizados com sucesso");
    setLoading(false);
  };

  return (
    <>
      <ScrollView>
        <Grid style={styles.container}>
          <Grid>
            <Topbar title="Perfil" />
          </Grid>
          <Grid>
            <Grid
              style={{
                ...styles.containerImage,
              }}
            >
              <Grid
                style={{
                  ...styles.containerCenterImage,
                }}
              >
                {photoURL ? (
                  <Avatar size={230} source={{ uri: photoURL }} />
                ) : (
                  <Avatar size={230} icon="account" />
                )}
                <Fab
                  onPress={pickImage}
                  icon="image"
                  style={{
                    ...styles.fab,
                    ...styles.left,
                  }}
                />
                <Fab
                  onPress={() => setCameraVisible(true)}
                  icon="camera"
                  style={{
                    ...styles.fab,
                    ...styles.right,
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            style={{
              marginTop: 30,
              ...styles.padding,
            }}
          >
            <TextInput
              disabled={true}
              label="ID"
              value={id} // Verifica se usuario está definido
            />
          </Grid>
          <Grid
            style={{
              ...styles.padding,
            }}
          >
            <TextInput
              disabled={true}
              label="Email"
              value={email} // Verifica se usuario está definido
            />
          </Grid>
          <Grid
            style={{
              marginTop: 30,
              ...styles.padding,
            }}
          >
            <TextInput label="Nome" value={nome} onChangeText={setNome} />
          </Grid>

          <Grid
            style={{
              ...styles.padding,
            }}
          >
            <TextInput
              label="Telefone"
              value={telefone} // Verifica se usuario está definido
              onChangeText={setTelefone}
            />
          </Grid>
          <Grid
            style={{
              ...styles.padding,
            }}
          >
            <Button loading={loading} onPress={_update} mode="contained">
              {telefone ? "Atualizar" : "Cadastrar"}
            </Button>
          </Grid>
        </Grid>
        <Snackbar
          visible={message !== null}
          onDismiss={() => setMessage(null)}
          duration={5000}
          text={message}
        />
        {cameraVisible ? (
          <Camera
            onCapture={onCapture}
            setCameraVisible={setCameraVisible}
            ref={cameraRef}
          />
        ) : null}
      </ScrollView>
    </>
  );
}
const styles = {
  containerImage: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  padding: {
    padding: 16,
  },
  containerCenterImage: {
    width: 230,
    position: "relative",
  },
  fab: {
    bottom: 0,
    position: "absolute",
    borderRadius: 200,
  },
  right: {
    right: 0,
  },
  left: {
    left: 0,
  },
  container: {
    backgroundColor: "#F8F8FF",
    height: "100%",
  },
};
