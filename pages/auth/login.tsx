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
        THe name is `{JSON.stringify(user?.email)}`
        <button
          onClick={() => {
            console.log("touched!");
            //  dispatch(signInGoogle()).payload
            dispatch(authWithGoogle()).then(() => router.push("/claim"));
          }}
        >
          Authenticate!!
        </button>
      </main>
    </div>
  );
};

export default LoginPage;
