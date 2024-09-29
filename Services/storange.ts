import {FirebaseStorage, getDownloadURL, ref, getStorage, uploadBytes, deleteObject} from "@firebase/storage";
import { firebaseApp } from "./fireBaseConfig";
import verifyConnection from "@/Infra/conection";


const uriToBlob = async (uri: string) => {
    const response = await fetch(uri);
    return await response.blob();
}

const uploadImageToFirebaseStorage = async (uri: string, path: string, name: string) => {
    const imageBlog = await uriToBlob(uri);
    if (!verifyConnection()) {
        throw new Error('Sem conexão com a internet');
        return false
    }else{
    try {
        const storage: FirebaseStorage = getStorage(firebaseApp);
        const storageRef = ref(storage, `images/${path}/${name}`);
        await uploadBytes(storageRef, imageBlog);
        return await getDownloadURL(storageRef);
    } catch (err) {
        console.error(`[uploadImageToFirebaseStorage] >> Error: ${err}`);
        throw err;
    }
}
}

const deleteImage = async (path: string, name: string) => {
    try {
        const storage: FirebaseStorage = getStorage(firebaseApp);
        const storageRef = ref(storage, `images/${path}/${name}`);
        await deleteObject(storageRef);
    }catch (err) {
        console.error(`[deleteImage] > Error: ${err}`);
        throw err;
    }
}

export {
    uploadImageToFirebaseStorage,
    deleteImage
}