
import {useContext} from 'react';
import {LanguageContext} from '../localization/context';

export default function useLanguage(){
  return useContext(LanguageContext);
}