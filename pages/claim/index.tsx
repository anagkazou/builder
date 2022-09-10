import { collection, getDocs, query, where } from "firebase/firestore";
import debounce from "lodash/debounce";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../firebase";
import { AppDispatch } from "../../redux";
import { selectUser } from "../../redux/features/auth/authSlice";
import {
  createNewPageFOrNewUser,
  selectpage as selectPage,
} from "../../redux/features/page-data/page-data.slice";
const ClaimPage: NextPage = () => {
  const [isAvailable, setIsAvailable] = useState<Boolean | null>(null);
  const [handle, setHandle] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();
  const page = useSelector(selectPage);
  const currentUser = useSelector(selectUser);
  const router = useRouter();

  const checkHandleAvailability = async () => {
    if (handle.length < 1) return;
    const pageRef = query(collection(db, "pages"), where("handle", "==", handle));
    const pageSnap = await getDocs(pageRef);

    //if no internet
    if (pageSnap.metadata.fromCache) {
      // setEmailIsValid(false);
      // setLoading(false);
      // setErrorMessage("Temporary error, try again later");
      // setGlobalErrorMessage("Temporary error, try again later");
      return;
    }

    if (pageSnap.empty) {
      setIsAvailable(true);
    } else {
      setIsAvailable(false);
    }
  };

  useEffect(() => {
    if (handle.length > 0) setTimeout(checkHandleAvailability, 500);
    if (handle == "") setIsAvailable(null);

    // console.log("HANDLEE",`-${handle}-` , isAvailable)
  }, [handle]);

  const handleChange = (input: string) => {
    setHandle(input);
  };

  const debouncedOnChange = useMemo(() => debounce(handleChange, 400), []);

  const createNewPage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    console.log("TOUCHED");
  };

  return (
    <div className="flex items-center justify-center claim">
      <div className="">
        <div className="form-group">
          {isAvailable !== null && (
            <div
              className={`status-color ${
                isAvailable === true ? "bg-green-400" : "bg-red-500"
              }`}
            ></div>
          )}
          <input
            onChange={(event) => debouncedOnChange(event.target.value)}
            type="text"
            maxLength={30}
          />
          <button
            onClick={() =>
              dispatch(createNewPageFOrNewUser(handle)).then(() =>
                router.push("/dashboard")
              )
            }
          >
            Check
          </button>
          {handle}
        </div>
      </div>
    </div>
  );
};

export default ClaimPage;
