import { Routes, Route } from "react-router-dom";
import "./App.css";
import LoadMongoData from "./pages/LoadMongoData";
import { CreateUser } from "./pages/CreateUser";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  Firestore,
  DocumentData,
} from "firebase/firestore/lite";
import { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyDBAP4JqX55QNc_raJuvJ2Q7qnPNixVfQ0",
  authDomain: "serverless-chat-app-b2709.firebaseapp.com",
  projectId: "serverless-chat-app-b2709",
  storageBucket: "serverless-chat-app-b2709.appspot.com",
  messagingSenderId: "126486479583",
  appId: "1:126486479583:web:10b316bed7bcf4500e9f6a",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getChat(db: Firestore) {
  const messagesCollection = collection(db, "messages");
  const messagesSnabShot = await getDocs(messagesCollection);
  const messageList = messagesSnabShot.docs.map((doc) => doc.data);
  return messageList;
}

function App() {
  const [messages, setMessages] = useState<DocumentData>([]);
  useEffect(() => {
    getChat(db).then(setMessages);
  }, []);

  <h2>Firebase</h2>;
  return <h2>hej</h2>;
}
