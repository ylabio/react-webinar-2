import React from 'react';
import { dictionary } from './dictionary';

export default function translator(selectedLanguage) {
  if (selectedLanguage === 'ru') {
    return dictionary.ru;
  }
  if (selectedLanguage === 'eng') {
    return dictionary.eng;
  }
}
