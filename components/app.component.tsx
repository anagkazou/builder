import { AppProps } from "next/app";
import { auth } from "../firebase/index";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";

function AppComponent({ Component, pageProps }: AppProps) {
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);

  // function checkAuthState(type?: string): Promise<User | null> {
  //   return new Promise((resolve, reject) => {
  //     debugger;
  //     const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
  //       if (userAuth) resolve(userAuth);
  //     });
  //     unsubscribe();
  //   });
  // }
  console.log("[[AUTH]]:::>", auth);

  useEffect(() => {

    // checkAuthState().then((userAuth?: User | null) => {
    //   console.log("[[user]]:::>", userAuth);
    //   if (userAuth) {
    //     // @ts-ignore
    //     const userPage: string[] = store.getState().user?.currentUser?.pages;
    //
    //     const userRef = createUserProfileDocument(userAuth, userPage);
    //     // @ts-ignore
    //     onSnapshot(userRef, (snapshot: DocumentSnapshot) => {
    //       dispatch(setUser({ ...snapshot.data() }));
    //     });
    //   }
    // });
    // const unsubscribe = onAuthStateChanged(auth,  (userAuth) => {
    //   if (userAuth) {
    //
    //     // @ts-ignore
    //     const userPage: string[] = store.getState().user?.currentUser?.pages;
    //
    //     const userRef =  createUserProfileDocument(userAuth, userPage);
    //     // @ts-ignore
    //     onSnapshot(userRef, (snapshot: DocumentSnapshot) => {
    //       dispatch(setUser({ ...snapshot.data() }));
    //     });
    //   }
    // });

    //return unsubscribe;

    console.log("[[USERRRR]]:::>", user);

  }, [user]);

  return <Component {...pageProps} />;
}

export default AppComponent;