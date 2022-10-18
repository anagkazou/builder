import React, { ReactElement, useEffect, useState } from "react";
// @ts-ignore
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useDetectKeyboardOpen from "use-detect-keyboard-open";
// @ts-ignore
// @ts-ignore
import {
  faTwitter,
  faFacebook,
  faInstagram,
  faTwitch,
  faTiktok,
  faSoundcloud,
  faSpotify,
  faPinterest,
  faSnapchat,
  faYoutube,
  faLinkedin,
  IconDefinition
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faBox, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Simulate } from "react-dom/test-utils";
import {
  DEFAULT_SOCIAL_LINKS, saveSocialLinks, selectSections, selectSocialLinks
} from "../../../../redux/features/sections/sections.slice";
import input = Simulate.input;
import { useDispatch, useSelector } from "react-redux";

type SocialsView = {}
type SocialItem = {
  network: string; enabled: boolean; prefix: string; value: string; isUrl: string
}


const addSocialLink = () => {

};
type SocialView = {
  setPanelHeight: any
}
export const SocialsView: React.FC<SocialView> = ({ setPanelHeight }) => {
  const sectionState = useSelector(selectSections);
  const dispatch = useDispatch();
  const socialLinksIndexInStore = useSelector(selectSocialLinks);
  const socialLinksFromStore = sectionState.items[socialLinksIndexInStore];

  const [inputFieldInFocus, setInputFieldInFocus] = useState<number | null>(null);
  // @ts-ignore
  const [socialLinks, setSocialLinks] = useState<Array<SocialItem>>(initialState);

  function initialState() {
    // @ts-ignore
    //  console.log("USERSOCIALLINKSINSTORE::", socialLinksIndexInStore?.links);
    console.log(socialLinksIndexInStore, "UINS");
    if (socialLinksIndexInStore === -1) return DEFAULT_SOCIAL_LINKS; else {
      console.log("PPPPP", socialLinksFromStore);
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
    setPanelHeight(35);
    setInputFieldInFocus(i);
    // tempState();
  };

  const handleOnBlur = (index?: number) => {
    if (index && !socialLinks[index].enabled) inputRefs[index].value = "";
    // @ts-ignore
    //if (!socialLinks[index].value.length) setSocialLinks(())

    if (!saved) setSocialLinks(prev => prev.map((el, i) => i === index ? {
      ...el, value: temp
    } : el));

    setPanelHeight(90);
    setInputFieldInFocus(null);


  };
  const getSocialIcon = (network: string) => {
    if (network == "Envelope") return faEnvelope; else if (network == "Spotify") return faSpotify; else if (network == "Twitch") return faTwitch; else if (network == "Linkedin") return faLinkedin; else if (network == "Snapchat") return faSnapchat; else if (network == "Youtube") return faYoutube; else if (network == "Facebook") return faFacebook; else if (network == "Twitter") return faTwitter; else return faBox;
  };

  const inputRefs: any = [];
  const setRef = (ref: any) => inputRefs.push(ref);

  const handleClick = (index: number) => {
    console.log("INDEXXX", index);
    console.log("REFFF", inputRefs[index]);
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
    setPanelHeight(70);

  };

  const handleChange = (index: number, event: any) => {
    const value = event.target.value.replace(/\s/g, "");
    // setSocialLinks(prevState => [...prevState, prevState[index].value = value]);

    setSocialLinks(prev => prev.map((el, i) => i === index ? {
      ...el, value: value
    } : el));


    setSaved(false);
    //  setTempState()
    console.log("NEW STATE:::", socialLinks[index]);
  };

  return (<div className="w-screen px-4 pt-4 pb-14 socials-view fadeInLeft">
    <div className="socials-view__links">
      {socialLinks.map((item, index) => (<form key={index}
                                               className={`flex flex-row mb-2 
                                               ${!item?.enabled && inputFieldInFocus !== index ? "absolute -left-full" : ""}
                                               `}>
        <div
          className={`input-wrapper flex w-96  rounded-lg border-b-neutral-300 ${inputFieldInFocus !== index && inputFieldInFocus ? "hidden" : ""}`}>

          <div className={`social flex items-center  `}>
            <FontAwesomeIcon icon={getSocialIcon(item.network)} size={"1x"}
                             color={"#fff"} />

          </div>
          <input key={index} id="Youtube"
                 onFocus={() => handleFocus(index)}
                 value={item?.value}
            // onBlur={handleOnBlur}
                 onChange={(event) => handleChange(index, event)}
                 autoComplete={"off"}
                 name={item?.network}
                 autoFocus={true}
                 ref={setRef}
                 className={`  p-2.5 w-full text-sm text-gray-900   border-none bg-transparent`}
                 placeholder={item?.network}

                 type="text" />

          <button
            className={`text-sm  bg-transparent  border-none ${inputFieldInFocus == index ? "block" : "hidden"} `}
            onClick={(event) => event.preventDefault()}
          ><FontAwesomeIcon icon={faXmark} size={"2x"} color={"#000"} />
          </button>
        </div>

        <button
          className={`text-sm  bg-transparent  border-none ${inputFieldInFocus == index ? "block" : "hidden"} `}
          onClick={(event) => {
            event.preventDefault();
            saveUrl(index, event);
          }}
        >
          <FontAwesomeIcon icon={faCheck} color={"#000"} /></button>
      </form>))}
    </div>

    <div
      className={`socials-view__grid ${inputFieldInFocus == null ? "grid" : "hidden"}`}>
      {socialLinks.map((item, index) => <button key={index}
                                                disabled={item?.enabled}
                                                onClick={() => handleClick(index)}
                                                className="flex content-center justify-center socials-view__grid--item">
        {<FontAwesomeIcon icon={getSocialIcon(item?.network)} />}
      </button>)}
    </div>
  </div>);
};

