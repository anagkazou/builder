import type { NextPage } from "next";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux";
import { authWithGoogle, selectUser } from "../../redux/features/auth/authSlice";

export const LoginPage: NextPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);

  return (
    <div>
      <main>
        THe name is `{JSON.stringify(user?.email)}`
        <button
          onClick={() => {
            console.log("touched!");
            //  dispatch(signInGoogle()).payload
            console.log(dispatch(authWithGoogle()));
          }}
        >
          Authenticate!!
        </button>
      </main>
    </div>
  );
};

export default LoginPage;
