import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, initializeAuth, getReactNativePersistence} from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: "AIzaSyAuqWOvBBz-2fEYFlb16oDNyVEdZCn3EIs",
  authDomain: "sistema-de-compras-95ebc.firebaseapp.com",
  projectId: "sistema-de-compras-95ebc",
  storageBucket: "sistema-de-compras-95ebc.appspot.com",
  messagingSenderId: "766541000253",
  appId: "1:766541000253:web:f9bcf407c14773aa61c454"
};

const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
//const auth = getAuth(firebaseApp);
const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { firebaseApp, db, auth};