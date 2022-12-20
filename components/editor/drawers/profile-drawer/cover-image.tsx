import { useRef } from "react";
import { Icons } from "../../../../assets/icons";
import { useDispatch } from "react-redux";
import {
  setPageCoverImage
} from "../../../../redux/features/editor/editor.slice";
import { UploadSimple } from "phosphor-react";
import { ActiveUpload } from "./index";

type CoverImageType = {
  image: any, onChange: any
}
export const CoverImage: React.FC<CoverImageType> = ({ image, onChange }) => {
  const dispatch = useDispatch();
  const hiddenFileInput = useRef<any>(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file


  return (<>
    {image ?
      <div className="relative w-2/3 h-auto relative rounded-md " style={{
        backgroundImage: `linear-gradient(45deg,#00000033, #00000033),url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "50%"

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
          <UploadSimple size={22} weight={"regular"} color="#545454"  className="mb-1"/>
          <p className="text-sm">Cover Photo</p>

        </div>
      </div>}
    <input
      type="file"
      ref={hiddenFileInput}
      accept="image/*"
      onChange={onChange}
      name={ActiveUpload.COVER_IMAGE}
      style={{ display: "none" }}
    />
  </>);
};