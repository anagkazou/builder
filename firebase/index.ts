import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Auth, getAuth, GoogleAuthProvider, User } from "firebase/auth";
import {
  collection, doc, getDoc, getFirestore, setDoc, writeBatch
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCkdSXgFTlLqob-D2xV-2Taz5oxJ9OrkT4",
  authDomain: "builder-d308b.firebaseapp.com",
  projectId: "builder-d308b",
  storageBucket: "builder-d308b.appspot.com",
  messagingSenderId: "416962586828",
  appId: "1:416962586828:web:a8da2cd076ff06f38cba69",
  measurementId: "G-YW0PM1V7JW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

export const provider = new GoogleAuthProvider();
if (typeof window !== "undefined") {
  // browser code
}
export const db = getFirestore(app) || null;
export { firebaseConfig as firebase };
export const auth = getAuth(app);

export const createUserProfileDocument = async (userAuth: User, handle:string|null) => {
  if (!userAuth) return;

  const userRef = doc(db, "users", userAuth.uid);
  const pageDocRef = doc(collection(db, "pages"));

  try {
    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth;

      const createdAt = new Date();

      //store user in Firestore
      let batch = writeBatch(db);

      batch.set(userRef, { displayName, createdAt, email, handle:handle });
      batch.set(pageDocRef, { handle: handle, createdAt: new Date(), id:pageDocRef.id });
      await batch.commit();
    }
  } catch (error) {
    console.log(error);
  }

  return userRef;
};
