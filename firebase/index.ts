import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyACr3OnikvSwt6W-tqHk4ozDFmSfOcdzhY",
  authDomain: "instagram-clone-31041.firebaseapp.com",
  projectId: "instagram-clone-31041",
  storageBucket: "instagram-clone-31041.appspot.com",
  messagingSenderId: "346742441161",
  appId: "1:346742441161:web:6481f1f030130211aa3918",
  measurementId: "G-9P2B7LJBE1",
};

let app;
let auth;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} else {
  app = getApp();
  auth = getAuth(app);
}

// Initialize Firebase Firestore and Storage
const firestore = getFirestore(app);
const storage = getStorage(app);

// Function to store Firebase configuration in AsyncStorage
const storeFirebaseConfig = async () => {
  try {
    await AsyncStorage.setItem(
      "firebaseConfig",
      JSON.stringify(firebaseConfig)
    );
  } catch (error) {
    console.error("Error storing Firebase config:", error);
  }
};

export { app, auth, firestore, storage, storeFirebaseConfig };
