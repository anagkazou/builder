import Image from "next/image";
import { useRef } from "react";

type ProfileImageType = {
  image: any,
  onChange:any

}
export const ProfileImage:React.FC<ProfileImageType> = ({image, onChange}) => {

  const hiddenFileInput = useRef<any>(null);

  const handleClick = (event: any) => {
    hiddenFileInput.current.click();
  };
  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file
  const readFile = (file: Blob) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  };
  return(
      <>
        {image ?
          <img src={image} className={"w-1/3 h-auto"}/> : <div
            className="image-upload__profile bg-zinc-800 flex place-content-center items-center w-1/3 "
            role={"button"}
            onClick={handleClick}
          >
            <p>Profile Photo</p>
          </div>}
        <input
          type="file"
          ref={hiddenFileInput}
          accept="image/*"
          onChange={onChange}
          name="PROFILE-IMAGE"
          style={{ display: "none" }}
        />
      </>
  )
}