import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBSoCErx6O_3ua_m_VcdB1_sMFCuPhGM98",
  authDomain: "travel-ai-ee75e.firebaseapp.com",
  projectId: "travel-ai-ee75e",
  storageBucket: "travel-ai-ee75e.firebasestorage.app",
  messagingSenderId: "505437556788",
  appId: "1:505437556788:web:e44267ce7595321665fa61",
  measurementId: "G-JNZD6DG49Z"
};

import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { auth, db, analytics };
