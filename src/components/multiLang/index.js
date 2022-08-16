import React, { useCallback } from "react";
import { cn as bem } from "@bem-react/classname";
import './style.css';
import propTypes from 'prop-types';


function MultiLang(props) {
  const cn = bem('MultiLang');

  const callbacks = {
    onClick: useCallback((lang) => props.setLang(lang), [props.setLang])
  };

  return (
    <div className={cn('lang')}>
      {props.langArr.map((lang, i, arr) => {
        return (
          <span onClick={() => callbacks.onClick(lang)} key={i}>
            {i === arr.length - 1 ? lang : lang + " / "}
          </span>
        )
      }
      )}
    </div>
  )

}

MultiLang.propTypes = {
  langArr: propTypes.array,
  setLang: propTypes.func,
}

MultiLang.defaultProps = {
  langArr: [],
  setLang: () => { }
}

export default React.memo(MultiLang);
