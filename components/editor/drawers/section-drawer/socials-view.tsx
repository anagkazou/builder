import React, { useEffect, useMemo, useState } from "react";
// @ts-ignore
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useDetectKeyboardOpen from "use-detect-keyboard-open";
// @ts-ignore
// @ts-ignore
// import {
//   faTwitter,
//   faFacebook,
//   faInstagram,
//   faTwitch,
//   faTiktok,
//   faSoundcloud,
//   faSpotify,
//   faPinterest,
//   faSnapchat,
//   faYoutube,
//   faLinkedin,
//   IconDefinition
// } from "@fortawesome/free-brands-svg-icons";
import { Icons } from "../../../../assets/icons";
// import {
//   DEFAULT_SOCIAL_LINKS, saveSocialLinks, selectSections, selectSocialLinks
// } from "../../../../redux/features/sections/sections.slice";
import { DEFAULT_SOCIAL_LINKS } from "../../../../app.consts";
import {
  saveSocialLinks, selectPage, selectSocialLinks
} from "../../../../redux/features/editor/editor.slice";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUiState, setInputElementInFocus
} from "../../../../redux/features/ui-state/ui-state.slice";

type SocialsView = {}
type SocialItem = {
  network: string; enabled: boolean; prefix: string; value: string; isUrl: string
}


type SocialView = {}
export const SocialsView: React.FC<SocialView> = () => {
  const sectionState = useSelector(selectPage);
  const dispatch = useDispatch();
  const socialLinksIndexInStore = useSelector(selectSocialLinks);
  const socialLinksFromStore = sectionState.items[socialLinksIndexInStore];
  const { inputInFocus } = useSelector(selectUiState);

  const [inputFieldInFocus, setInputFieldInFocus] = useState<number | null>(null);
  // @ts-ignore
  const [socialLinks, setSocialLinks] = useState<Array<SocialItem>>(initialState);

  function initialState() {
    // @ts-ignore
    //  console.log("USERSOCIALLINKSINSTORE::", socialLinksIndexInStore?.links);
    console.log(socialLinksIndexInStore, "UINS");
    if (socialLinksIndexInStore === -1) return DEFAULT_SOCIAL_LINKS; else {
      // @ts-ignore
      return socialLinksFromStore.links;
    }

  }

  //Todo: make this a custom hook
  const isKeyboardOpen = useDetectKeyboardOpen();

  useEffect(() => {
    if (!isKeyboardOpen) { // @ts-ignore
      handleOnBlur(inputFieldInFocus);
      // @ts-ignore
      console.log("ooooo", inputRefs[inputFieldInFocus]);
      // @ts-ignore
      inputRefs[inputFieldInFocus]?.blur();

      inputRefs.forEach((inputRef: any) => inputRef?.blur());
    }
  }, [isKeyboardOpen]);
  const [saved, setSaved] = useState<boolean>(false);

  useEffect(() => {
    if (saved) {
      console.log("touched");
      dispatch(saveSocialLinks((socialLinks)));
    }
  }, [saved]);
  useEffect(() => {
    console.log("SOCIALLINKS,", socialLinks);
  });


  const [temp, setTemp] = useState<string>(); //Todo: try to reduce state declarations... refs can hold some of these values
  const handleFocus = (i: number) => {
    setTemp(socialLinks[i].value);
    setInputFieldInFocus(i);
    dispatch(setInputElementInFocus(true));

    // tempState();
  };

  const handleOnBlur = (index?: number) => {
    if (index && !socialLinks[index].enabled) inputRefs[index].value = "";
    // @ts-ignore
    //if (!socialLinks[index].value.length) setSocialLinks(())

    if (!saved) setSocialLinks(prev => prev.map((el, i) => i === index ? {
      ...el, value: temp
    } : el));

    setInputFieldInFocus(null);
    dispatch(setInputElementInFocus(false));


  };
  const getSocialIcon = (network: string) => {
    if (network == "Envelope") return <Icons.Envelope />; else if (network == "Spotify") return <Icons.Spotify />; else if (network == "Twitch") return <Icons.Twitch />; else if (network == "Linkedin") return <Icons.LinkedIn />; else if (network == "Snapchat") return <Icons.SnapChat />; else if (network == "Youtube") return <Icons.Youtube />; else if (network == "Facebook") return <Icons.Facebook />; else if (network == "Twitter") return <Icons.Twitter />; else if (network == "Pinterest") return <Icons.Pinterest />; else if (network == "Soundcloud") return <Icons.Soundcloud />; else if (network == "Tiktok") return <Icons.Tiktok />; else if (network == "Instagram") return <Icons.Instagram />; else if (network == "Patreon") return <Icons.Patreon />; else if (network == "Medium") return <Icons.Medium />;
  };

  const inputRefs: any = [];
  const setRef = (ref: any) => inputRefs.push(ref);

  const handleClick = (index: number) => {

    setInputFieldInFocus(index);
    inputRefs[index]?.focus();
  };

  const saveUrl = (index: number, event: any) => {
    event.preventDefault();
    //@ts-ignore
    const value = inputRefs[inputFieldInFocus]?.value;

    setSocialLinks(prev => prev.map((el, i) => i === index ? {
      ...el, enabled: !!value.length
    } : el));
    setSaved(true);

    setInputFieldInFocus(null);

  };

  const handleChange = (index: number, event: any) => {
    const value = event.target.value.replace(/\s/g, "");
    // setSocialLinks(prevState => [...prevState, prevState[index].value = value]);

    setSocialLinks(prev => prev.map((el, i) => i === index ? {
      ...el, value: value, enabled: !!value.length
    } : el));


    setSaved(false);
    //  setTempState()
    console.log("NEW STATE:::", socialLinks[index]);
  };

  const enabledSocialsCount = useMemo(() => socialLinks.filter((item) => item.enabled).length, [socialLinks]);

  return (<div className="w-screen px-4 pt-6 pb-6 socials-view fadeInLeft">
    <div className="socials-view__links mb-4">
      {socialLinks?.map((item, index) => (<form key={index}
                                                className={`flex flex-row mb-2 
                                               ${!item?.enabled && inputFieldInFocus !== index ? "absolute -left-full" : ""}
                                               `}>
        <div
          className={`input-container input-wrapper flex w-96  text-sm text-zinc-900 text-gr border-0 leading-tight px-3 w-
                         appearance-none px-2 ${inputFieldInFocus !== index && inputFieldInFocus ? "hidden" : ""}`}>

          <div className={`social flex items-center  `}>
            {getSocialIcon(item.network)}


          </div>
          <input key={index} id="Youtube"
                 onFocus={() => handleFocus(index)}
                 value={item?.value}
                 onBlur={() => handleOnBlur()}
                 onChange={(event) => handleChange(index, event)}
                 autoComplete={"off"}
                 name={item?.network}
                 autoFocus={true}
                 ref={setRef}
                 className={`  p-2.5 w-full text-sm text-gray-900   border-none bg-transparent`}
                 placeholder={item?.network}
                 type="text" />

          {/*<button*/}
          {/*  className={`text-sm  bg-transparent  border-none ${inputFieldInFocus == index ? "block" : "hidden"} `}*/}
          {/*  onClick={(event) => event.preventDefault()}*/}
          {/*><FontAwesomeIcon icon={faXmark} size={"2x"} color={"#000"} />*/}
          {/*</button>*/}
        </div>

        <button
          className={`text-sm  bg-transparent  border-none ${inputFieldInFocus == index ? "block" : "hidden"} `}
          onClick={(event) => {
            event.preventDefault();
            saveUrl(index, event);
          }}
        >
          <Icons.Save /></button>
      </form>))}
    </div>
    <div
      className={`${!inputInFocus && "mb-12"} ${inputFieldInFocus == null ? "grid" : "hidden"}`}>
      <div
        className="socials-view__count flex items-center justify-between mb-2">
        <p className=" font-medium text-xs uppercase"> Add new</p>

        <div className="count">
          {`${enabledSocialsCount}/${socialLinks.length}`}
        </div>
      </div>
      <div
        className={` socials-view__grid grid`}>


        {socialLinks.map((item, index) => <button key={index}
                                                  disabled={item?.enabled}
                                                  onClick={() => handleClick(index)}
                                                  className="flex content-center justify-center socials-view__grid--item">
          {getSocialIcon(item?.network)}
        </button>)}
      </div>
    </div>

  </div>);
};

