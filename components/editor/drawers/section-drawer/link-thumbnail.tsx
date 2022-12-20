import { ImageSquare, X } from "phosphor-react";
import React, { ChangeEventHandler, useEffect, useRef } from "react";
import {
  deleteLinkImage
} from "../../../../redux/features/editor/editor.slice";
import { useDispatch } from "react-redux";
import { ActiveUpload } from "../profile-drawer";

export const LinkThumbnail = ({
                                index, image, setImageIndex, setActiveUpload, onFileChange
                              }: { index: number, setImageIndex:Function, image?: string, setActiveUpload: Function, onFileChange: ChangeEventHandler<HTMLInputElement> }) => {

  const hiddenFileInput = useRef<any>(null);
  const dispatch = useDispatch();

  const handleClick = () => {
    setImageIndex(index);
    hiddenFileInput.current.click();
  };

  useEffect(() => {
    console.log("INDEX", index)
  }, []);


  return (<div className="mr-1 w-1/6">
      {image ?
        <div className="relative w-full h-full relative rounded-md bg-cover "
             style={{
               backgroundImage: `linear-gradient(45deg,#00000033, #00000033),url(${image})`,
               backgroundPosition: "50%"
             }}>

          <button onClick={() =>

            dispatch(deleteLinkImage(index)

            )} role="button"
                  className="right-1 bg-neutral-700 p-[2px] rounded-md absolute top-1">
            <X size={12} weight={"thin"} color="white" />
          </button>
        </div> : <div
          className="image-upload__profile input-container border-orange-500 flex place-content-center items-center h-full "
          role={"button"}
          onClick={handleClick}
        >
          <div className="upload__empty-state flex flex-col items-center">
            <ImageSquare size={32} weight={"thin"} color="#545454"
                         className="mb-1" />
          </div>
        </div>}


      <input
        type="file"
        ref={hiddenFileInput}
        accept="image/*"
        onChange={onFileChange}
        name={ActiveUpload.LINK_IMAGE}
        style={{ display: "none" }} />
    </div>

  );
};

