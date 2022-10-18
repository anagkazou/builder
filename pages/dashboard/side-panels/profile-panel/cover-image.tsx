import Image from "next/image";
import { useEffect, useRef } from "react";

type CoverImageType = {
  image: any,
  onChange:any
}
export const CoverImage:React.FC<CoverImageType> = ({image, onChange}) => {

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
        <img src={image} className={"w-2/3 h-auto"} onClick={handleClick} /> : <div
          className="image-upload__profile border-orange-500 flex place-content-center items-center w-2/3 "
          role={"button"}
          onClick={handleClick}
        >
          <p>Cover Photo</p>
        </div>}
      <input
        type="file"
        ref={hiddenFileInput}
        accept="image/*"
        onChange={onChange}
        name="COVER-IMAGE"
        style={{ display: "none" }}
      />
    </>
  )
}