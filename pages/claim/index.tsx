import { collection, getDocs, query, where } from "firebase/firestore";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
const ClaimPage: NextPage = () => {
  const [isAvailable, setIsAvailable] = useState<Boolean | null>(null);
  const [handle, setHandle] = useState<string>("");

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
  if(handle.length)  checkHandleAvailability();
    else setIsAvailable(null)
  }, [handle]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHandle(event.target.value);

  };
  return (
    <div className="flex items-center justify-center claim">
      <form className="">
        <div className="form-group">
          <div
            className={`status-color ${
              isAvailable === true
                ? "bg-green-400"
                : isAvailable === false
                ? "bg-red-500"
                : null
            }`}
          ></div>
          <input onChange={(event) => handleChange(event)} type="text" maxLength={30} />
          <button onClick={(event) => null}>Check</button>
        </div>
      </form>
    </div>
  );
};

export default ClaimPage;
