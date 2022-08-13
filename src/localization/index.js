// Делаю локализацию ООП способом

import {russianDict} from './languages/russian';
import {englishDict} from './languages/english';

export const AppLanguage = {
  russian: russianDict,
  english: englishDict
}

export function getLocalization(context) {
  let { language } = context
  return AppLanguage[language]
}

export const LanguageDisplayName = {
  russian: 'Русский',
  english: 'English'
}

export const getLanguageName = (displayName) => {
  switch (displayName) {
    case "Русский":
      return "russian"
    case "English":
      return "english"
    default:
      return "Unknown"
  }
}