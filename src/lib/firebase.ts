import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC9oS4EFLSsJUVvKZxwV2O1EssjNBxSt_I",
  authDomain: "monthly-plan-e99e2.firebaseapp.com",
  databaseURL: "https://monthly-plan-e99e2-default-rtdb.firebaseio.com",
  projectId: "monthly-plan-e99e2",
  storageBucket: "monthly-plan-e99e2.firebasestorage.app",
  messagingSenderId: "795074945369",
  appId: "1:795074945369:web:496f6f655e12274ef02c48",
  measurementId: "G-M5XBKE9QQC",
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);