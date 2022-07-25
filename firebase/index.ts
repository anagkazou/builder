import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Auth, getAuth, GoogleAuthProvider, User } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: "builder-d308b.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
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
