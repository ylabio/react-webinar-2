import { cn as bem } from "@bem-react/classname";
import propTypes from 'prop-types';
import React, { useMemo } from 'react';
import json from '../../localization.json';
import './style.css';

function LanguageChooser(props) {
  const cn = bem('LangChooser');

  const array = useMemo(() => { // достаточно посчитать всего 1 раз
    const tmp = [];
    Object.keys(json.languages).forEach((key, index) => {
      tmp.push(key);
    });
    return tmp;
  }, []);
  
  return (
    <div className={cn()}>
    {
      array.map((value, index) => {
      
        let style;
        switch (value) {
          default: style = 'normal'; break;
          case props.lnagID: style = 'selected'; break;
        }

        return <div
          className={cn(style)}
          key={index}
          onClick={
            props.lnagID == value ? null : () => props.onSelect(value)
          }
        >{value}</div>
      })
    }
    </div>
  );
};

LanguageChooser.propTypes = {
  onSelect: propTypes.func,
  lnagID: propTypes.string
}

LanguageChooser.defaultProps = {
  onSelect: () => {}
}

export default React.memo(LanguageChooser);