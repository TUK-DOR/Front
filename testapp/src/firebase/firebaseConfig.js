import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCtedm3Vmsw8NU7Kh1AoaXX_12uptaIMmw",
  authDomain: "matemate-2025.firebaseapp.com",
  projectId: "matemate-2025",
  storageBucket: "matemate-2025.appspot.com",
  messagingSenderId: "506478780963",
  appId: "1:506478780963:web:c3d85d7a8fa8ee97e80796",
  measurementId: "G-DBJVFD97FS"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Firestore 초기화
const db = getFirestore(app);

export default db;