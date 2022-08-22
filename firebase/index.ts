import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Auth, getAuth, GoogleAuthProvider, User } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
 apiKey: "AIzaSyCkdSXgFTlLqob-D2xV-2Taz5oxJ9OrkT4",
  authDomain: "builder-d308b.firebaseapp.com",
  projectId: "builder-d308b",
  storageBucket: "builder-d308b.appspot.com",
  messagingSenderId: "416962586828",
  appId: "1:416962586828:web:a8da2cd076ff06f38cba69",
  measurementId: "G-YW0PM1V7JW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

export const provider = new GoogleAuthProvider();
if (typeof window !== "undefined") {
  // browser code
}
export const db = getFirestore(app) || null;
export { firebaseConfig as firebase };
export const auth = getAuth(app);

export const createUserProfileDocument = async (userAuth: User) => {
  if (!userAuth) return;

  const userRef = doc(db, "users", userAuth.uid);
  try {
    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth;

      const createdAt = new Date();

      //store user in Firestore
      setDoc(userRef, { displayName, createdAt, email });
    }
  } catch (error) {
    console.log(error);
  }

  return userRef;
};
