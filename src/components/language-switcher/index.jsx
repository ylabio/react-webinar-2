import React, {useContext} from 'react';
import {cn as bem} from "@bem-react/classname";
import {LocalisationContext} from "l10n/localisationProvider";
import {l10n} from "l10n/strings";
import propTypes from "prop-types";
import './styles.css';

function LanguageSwitcher({languages}) {
  const cn = bem('LanguageSwitcher');

  const {lang, switchLanguage} = useContext(LocalisationContext);

  const heading = l10n.layout.languageSwitcher.heading[lang];

  return (
    <div className={cn()}>
      <h3 className={cn('heading')}>{heading}</h3>
      <ul className={cn('list')}>
        {languages.map((el,id) =>
          <li key={id} className={cn('item')}>
            <button onClick={() => switchLanguage(el)} className={cn('button')}>{el}</button>
          </li>)}
      </ul>
    </div>
  );
}

LanguageSwitcher.propTypes = {
  languages: propTypes.arrayOf(propTypes.string).isRequired,
};

export default React.memo(LanguageSwitcher);
