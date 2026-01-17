import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { 
    getAuth, 
    signInAnonymously, 
    signInWithCustomToken, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { 
    getFirestore, 
    collection, 
    addDoc, 
    onSnapshot, 
    doc, 
    updateDoc, 
    deleteDoc, 
    query, 
    orderBy 
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// تهيئة Firebase
const app = initializeApp(JSON.parse(__firebase_config));
const auth = getAuth(app);
const db = getFirestore(app);
const appId = __app_id;

let currentUser = null;
let allVouchers = [];

// المصادقة
export async function initAuth() {
    if (__initial_auth_token) {
        await signInWithCustomToken(auth, __initial_auth_token);
    } else {
        await signInAnonymously(auth);
    }
}

// مراقبة حالة المصادقة
onAuthStateChanged