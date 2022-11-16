import { getOrientation } from "get-orientation";
import { useRef } from "react";
import { getRotatedImage } from "../../utils/canvas-utils";
import Image from "next/image";

type FIleUploaderType = {
  setFileUploaded: any; //Todo: type this properly
  onChange: any; pageState: any
};
const ORIENTATION_TO_ANGLE: any = {
  "3": 180, "6": 90, "8": -90
};

export const FileUploader: React.FC<FIleUploaderType> = ({
                                                           setFileUploaded,
                                                           onChange,
                                                           pageState
                                                         }) => {
  // Create a reference to the hidden file input element
  const hiddenFileInput = useRef<any>(null);
  const coverImageFileInput = useRef<any>(null);

  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = (event: any) => {
    hiddenFileInput.current.click();
  };
  const handleCoverImageClick = (event: any) => {
    coverImageFileInput.current.click();
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

  const init = async (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);

      // apply rotation if needed
      const orientation = await getOrientation(file);
      const rotation = ORIENTATION_TO_ANGLE[orientation];
      if (rotation) {
        imageDataUrl = await getRotatedImage(imageDataUrl, rotation);
      }

      setFileUploaded(imageDataUrl);
    }
  };

  const handleChange = async (event: any) => {
    // Todo type this properly

    const fileUploaded = event.target.files[0];
    const imageSource = await readFile(fileUploaded);

    setFileUploaded(imageSource);
    console.log("FILEUPLOADED! ::", fileUploaded);
    //  handleUpload(fileUploaded);
  };

  return (<>
      <div
        className="image-upload flex align-center place-content-between space-x-2 h-40 ">
        {pageState.profileImage ?
          <Image src={pageState.profileImage} height={200} width={200} /> : <div
            className="image-upload__profile bg-zinc-800 flex place-content-center items-center w-40 "
            role={"button"}
            onClick={handleClick}
          >
            <p>Profile Photo</p>
          </div>}
        <div
          className="image-upload__cover bg-zinc-800 flex place-content-center items-center w-60"
          role={"button"}
          onClick={handleCoverImageClick}
        >
          <p>Cover Photo</p>
        </div>
      </div>

      <input
        type="file"
        ref={hiddenFileInput}
        name="PROFILE-IMAGE"
        accept="image/*"
        onChange={onChange}
        style={{ display: "none" }}
      />
    <input
      type="file"
      ref={coverImageFileInput}
      name="COVER-IMAGE"
      accept="image/*"
      onChange={onChange}
      style={{ display: "none" }}
    />
    </>);
};

function useState<T>(arg0: null): [any, any] {
  throw new Error("Function not implemented.");
}
