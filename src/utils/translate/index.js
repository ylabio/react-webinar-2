import ru from './ru.json';
import en from './en.json';

export const translate = (language, key) => {
    let languageData = {};
    switch (language) {
        case 'EN':
            languageData = en;     
            break;
        case 'RU':
        default:
            languageData = ru;
            break;
    }
  return languageData[key] || key;
}