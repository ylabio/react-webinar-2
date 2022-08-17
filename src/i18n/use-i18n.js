import {useContext} from "react";
import {I18nContext} from "./context";

export default function useI18n(){
  return useContext(I18nContext);
}
