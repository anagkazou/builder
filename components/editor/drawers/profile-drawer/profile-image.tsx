import { useRef } from "react";

type ProfileImageType = {
  image: any,
  onChange:any

}
export const ProfileImage:React.FC<ProfileImageType> = ({image, onChange}) => {

  const hiddenFileInput = useRef<any>(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file

  return(
      <>
        {image ?
          <img src={image} className={"w-1/3 h-auto"} onClick={handleClick}/> : <div
            className="image-upload__profile  flex place-content-center items-center w-1/3 "
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