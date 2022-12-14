import {
  LinkItem, SectionEnums, TextArea
} from "./redux/features/sections/sections.slice";

export const DEFAULT_SOCIAL_LINKS = [{
  network: "Instagram", enabled: false, value: "", prefix: "", isUrl: true
}, {
  network: "Facebook", enabled: false, value: "", prefix: "", isUrl: true
}, {
  network: "Spotify", enabled: false, value: "", prefix: "", isUrl: true
}, {
  network: "Tiktok", enabled: false, value: "", prefix: "", isUrl: true
}, {
  network: "Twitter", enabled: false, value: "", prefix: "", isUrl: false
}, {
  network: "Youtube", enabled: false, value: "", prefix: "", isUrl: true
}, {
  network: "Snapchat", enabled: false, value: "", prefix: "", isUrl: false
}, {
  network: "Linkedin", enabled: false, value: "", prefix: "", isUrl: true
}, {
  network: "Twitch", enabled: false, value: "", prefix: "", isUrl: false
}, {
  network: "Envelope", enabled: false, isUrl: true, value: "", prefix: ""
}, {
  network: "Pinterest", enabled: false, isUrl: true, value: "", prefix: ""
}, {
  network: "Patreon", enabled: false, isUrl: true, value: "", prefix: ""
}, {
  network: "Medium", enabled: false, isUrl: true, value: "", prefix: ""
}, {
  network: "Soundcloud", enabled: false, isUrl: true, value: "", prefix: ""
}];

export const DEFAULT_TEXT_AREA_PAYLOAD: TextArea = {
  type: SectionEnums.TEXT_AREA, title: "a title", content: "some content"

};
export const DEFAULT_CUSTOM_LINK: LinkItem = {
  description: "", url: ""
};