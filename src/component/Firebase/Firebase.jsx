import { initializeApp } from "firebase/app";

import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB7J5_MtQzQIJvPO_L7kZDQ7Yy4kQyaGhs",
  authDomain: "d2-bb6a0.firebaseapp.com",
  databaseURL:
    "https://d2-bb6a0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "d2-bb6a0",
  storageBucket: "d2-bb6a0.appspot.com",
  messagingSenderId: "419085664463",
  appId: "1:419085664463:web:5013975f80f292c003b7ba",
};
const app = initializeApp(firebaseConfig);

export default app;
