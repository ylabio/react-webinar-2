import LangArr from "./lang-arr";
import useSelector from "../use-selector";


export function translate(key) {
    // const output = LangArr.find(word => word === key)
    const select = useSelector(state => ({
        language: state.language.language
      }));

    return LangArr[select.language][key]
}