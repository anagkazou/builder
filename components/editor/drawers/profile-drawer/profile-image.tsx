import { useRef } from "react";
import { Icons } from "../../../../assets/icons";
import { useDispatch } from "react-redux";
import { setPageImage } from "../../../../redux/features/editor/editor.slice";

type ProfileImageType = {
  image: any, onChange: any

}
export const ProfileImage: React.FC<ProfileImageType> = ({
                                                           image, onChange
                                                         }) => {

  const hiddenFileInput = useRef<any>(null);
  const dispatch = useDispatch();
  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file

  return (<>
    {image ?
      <div className="relative w-1/3 h-auto relative rounded-md " style={{
        backgroundImage: `linear-gradient(45deg,#00000033, #00000033),url(${image})`,
        backgroundSize: "cover"

      }}>

        <button onClick={()=> dispatch(setPageImage(""))} role="button"
                className="right-1 bg-neutral-700 p-[2px] rounded-md absolute top-1">
          <Icons.Cancel stroke="#fff" width={12} height={12} /></button>
        {/*<img src={image} className={"w-full"} onClick={handleClick}/>*/}
      </div> : <div
        className="image-upload__profile input-container  flex place-content-center items-center w-1/3 "
        role={"button"}
        onClick={handleClick}
      >
        <div className="upload__empty-state flex flex-col items-center">
          <Icons.Upload className="mb-1" width={22} height={22}/>
          <p className="text-sm">Profile Photo</p>

        </div>
      </div>}
    <input
      type="file"
      ref={hiddenFileInput}
      accept="image/*"
      onChange={onChange}
      name="PROFILE-IMAGE"
      style={{ display: "none" }}
    />
  </>);
};