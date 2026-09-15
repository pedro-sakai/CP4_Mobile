import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeAuth, getAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { getReactNativePersistence } = require("firebase/auth");

const firebaseConfig = {
  apiKey: "AIzaSyAiYARS7eE9hL6Au6Wh1Vh9j8xkaQ9hg8Q",
  authDomain: "cp-mobile-dbe43.firebaseapp.com",
  projectId: "cp-mobile-dbe43",
  storageBucket: "cp-mobile-dbe43.firebasestorage.app",
  messagingSenderId: "31444899356",
  appId: "1:31444899356:web:2eb7449512873b0832f1d9",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

function criarOuReaproveitarAuth() {
  try {
    return initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (erro: any) {
    if (erro?.code === "auth/already-initialized") {
      return getAuth(app);
    }
    throw erro;
  }
}

export const auth = criarOuReaproveitarAuth();

export default app;
