import { useContext } from 'react';
import { LangContext } from '../../multiLang/langContext';

export default function useLang() {
  return useContext(LangContext);
}
