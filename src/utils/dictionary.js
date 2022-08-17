import React from 'react';
import json from "../lang.json";


export default function lang(lang, word) {
  function translate (ln, wd) {
    const words = json.languages[ln];
    if (!words)
      return '';
    return words[wd];
  }

  return translate(lang, word)
}