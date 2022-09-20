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
import { faBox, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Simulate } from "react-dom/test-utils";
import input = Simulate.input;

type SocialsView = {}
type SocialItem = {
  network: string; enabled: boolean; prefix: string; value: string; isUrl: string
}
const SOCIAL_LINKS = [{
  network: "Spotify", enabled: true, value: "", prefix: "", isUrl: true
}, {
  network: "Facebook",
  enabled: true,
  value: "ayomikel",
  prefix: "facebook.com/",
  isUrl: true
}, {
  network: "Twitter",
  enabled: true,
  value: "anagkazou",
  prefix: "twitter.com/",
  isUrl: false
}, {
  network: "Youtube", enabled: true, value: "dailywire", prefix: "", isUrl: true
}, {
  network: "Snapchat", enabled: true, value: "", prefix: "", isUrl: false
}, {
  network: "Linkedin", enabled: false, value: "lin", prefix: "", isUrl: true
}, {
  network: "Twitch", enabled: false, value: "", prefix: "", isUrl: false
}, {
  network: "Envelope",
  enabled: false,
  isUrl: true,
  value: "thedavidomole",
  prefix: ""
}];


const addSocialLink = () => {

};
type SocialView = {
  setPanelHeight: any
}
export const SocialsView: React.FC<SocialView> = ({ setPanelHeight }) => {

  const [inputFieldInFocus, setInputFieldInFocus] = useState<number | null>(null);
  const [socialLinks, setSocialLinks] = useState(SOCIAL_LINKS);
  const isKeyboardOpen = useDetectKeyboardOpen();

  useEffect(() => {
    if (!isKeyboardOpen) { // @ts-ignore
      handleOnBlur(inputFieldInFocus);
      // @ts-ignore
      console.log("ooooo", inputRefs[inputFieldInFocus]);
      inputRefs[inputFieldInFocus]?.current?.blur();
    }
  }, [isKeyboardOpen]);

  const [saved, setSavedState] = useState(false);
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

    setSavedState(true);
    setInputFieldInFocus(null);
    setPanelHeight(70);
    
  };

  const handleChange = (index: number, event: any) => {
    const value = event.target.value;
    // setSocialLinks(prevState => [...prevState, prevState[index].value = value]);

    setSocialLinks(prev => prev.map((el, i) => i === index ? {
      ...el, value: value
    } : el));
    setSavedState(false);
    //  setTempState()
    console.log("NEW STATE:::", socialLinks[index]);
  };
  return (<div className="w-screen px-4 pt-4 socials-view fadeInLeft">
    <div className="pb-4 socials-view__links">
      {socialLinks.map((item, index) => (<form key={index}
                                               className={`flex flex-row  
                                               ${!item?.enabled && inputFieldInFocus !== index ? "absolute -left-full" : ""}
                                               `}>
        <input key={index} id="Youtube"
               onFocus={() => handleFocus(index)}
               value={item?.value}
          // onBlur={handleOnBlur}
               onChange={(event) => handleChange(index, event)}
               autoComplete={"off"}
               name={item?.network}
               autoFocus={true}
               ref={setRef}
               className={`mb-2  ${inputFieldInFocus !== index && inputFieldInFocus !== null ? "hidden" : ""}  p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
               placeholder={item?.network} />
        <button
          className={`text-sm text-gray-900 bg-transparent  border-none ${inputFieldInFocus == index ? "block" : "hidden"} `}
          onClick={(event) => saveUrl(index, event)}
        >
          <FontAwesomeIcon icon={faCheck} color={"#fff"} /></button>
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

