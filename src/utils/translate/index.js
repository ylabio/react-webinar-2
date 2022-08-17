import languages from "./languages";

const translate = (language, text) => {
  return languages[language][text]
}

export default translate;