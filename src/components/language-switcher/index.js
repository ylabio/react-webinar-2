import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import {cn as bem} from "@bem-react/classname";

const lngs = {
  ru: {nativeName: 'ru'},
  en: {nativeName: 'en'}
};

function LangSwitcher() {
  const cn = bem('LangSwitcher');
  const {t, i18n} = useTranslation('translation');

  return (
    <div className={cn()}>
      {t('LangSwitcherLang')}:&nbsp;
      {Object.keys(lngs).map((lng) => (
        <button
          className={cn('button')}
          key={lng}
          style={{fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal'}}
          type="submit"
          onClick={() => i18n.changeLanguage(lng)}>
          {lngs[lng].nativeName}
        </button>
      ))}
    </div>
  );
}

export default React.memo(LangSwitcher);