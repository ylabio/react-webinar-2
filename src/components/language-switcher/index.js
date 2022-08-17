import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './styles.css';

function LanguageSwitcher({languages, heading, onClick}) {
  const cn = bem('LanguageSwitcher');


  return (
    <div className={cn()}>
      <h3 className={cn('heading')}>{heading}</h3>
      <ul className={cn('list')}>
        {languages.map((el,id) =>
          <li key={id} className={cn('item')}>
            <button onClick={() => onClick(el)} className={cn('button')}>{el}</button>
          </li>)}
      </ul>
    </div>
  );
}

LanguageSwitcher.propTypes = {
  languages: propTypes.arrayOf(propTypes.string).isRequired,
  heading: propTypes.string.isRequired,
  onClick: propTypes.func.isRequired,
};

export default React.memo(LanguageSwitcher);
