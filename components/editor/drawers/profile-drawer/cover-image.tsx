import { useRef } from "react";
import { Icons } from "../../../../assets/icons";
import { useDispatch } from "react-redux";
import {
  setPageCoverImage
} from "../../../../redux/features/editor/editor.slice";

type CoverImageType = {
  image: any, onChange: any
}
export const CoverImage: React.FC<CoverImageType> = ({ image, onChange }) => {
  const dispatch = useDispatch();
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


  return (<>
    {image ?
      <div className="relative w-2/3 h-auto relative rounded-md " style={{
        backgroundImage: `linear-gradient(45deg,#00000033, #00000033),url(${image})`,
        backgroundSize: "cover"

      }}>
        <button onClick={() => dispatch(setPageCoverImage(""))} role="button"
                className="right-1 bg-neutral-700 p-[2px] rounded-md absolute top-1">
          <Icons.Cancel stroke="#fff" width={12} height={12} /></button>
      </div> : <div
        className="image-upload__profile input-container border-orange-500 flex place-content-center items-center w-2/3 "
        role={"button"}
        onClick={handleClick}
      >
        <div className="upload__empty-state flex flex-col items-center">
          <Icons.Upload className="mb-1" width={22} height={22} />
          <p className="text-sm">Cover Photo</p>

        </div>
      </div>}
    <input
      type="file"
      ref={hiddenFileInput}
      accept="image/*"
      onChange={onChange}
      name="COVER-IMAGE"
      style={{ display: "none" }}
    />
  </>);
};