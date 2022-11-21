import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux";
import { authWithGoogle, selectUser } from "../../redux/features/auth/authSlice";

export const LoginPage: NextPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const router = useRouter();
  return (
    <div>
      <main>
        THe name is `{JSON.stringify(user?.currentUser?.email)}`
        <button
          onClick={() => {
            dispatch(authWithGoogle()).then((value) => {
             console.log("valueee", value)
             console.log("valueee", value.payload instanceof Error)
             if( value.payload instanceof Error) {

               console.log("ERRORRR", value.payload);
               return;
             };

               router.push("/dashboard");
            });
          }}
        >
          Authenticate!!
        </button>
      </main>
    </div>
  );
};

export default LoginPage;
