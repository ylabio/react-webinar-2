import useSelector from "./use-selector";

export default function useLanguage() {
  const langPackage = useSelector(
    ({ language }) => language[language.currentLanguage]
  );

  return langPackage;
}
