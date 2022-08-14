import React, {useContext, useEffect, useRef} from "react";
import propTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import "./style.css";
import {LanguageContext} from "../../services/locale/context";
import Translation from "../../services/locale";

function LayoutModal(props) {
  const cn = bem('LayoutModal');

  const frame = useRef();
  const {language} = useContext(LanguageContext);

  useEffect(() => {
    let top = 10;
    if (window.innerWidth > frame.current.clientHeight) {
      top = Math.max(top, (window.innerHeight - frame.current.clientHeight) / 2 - top);
    }
    frame.current.style.marginTop = `${top}px`;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    }
  });

  return (
    <div className={cn()}>
      <div className={cn('frame')} ref={frame}>
        <div className={cn('head')}>
          <h1 className={cn('title')}>
            {props.title}
          </h1>
          <button className={cn('close')} onClick={props.onClose}>{Translation[language].actions.close}</button>
        </div>
        <div className={cn('content')}>
          {props.children}
        </div>
      </div>
    </div>
  );
}

LayoutModal.propTypes = {
  title: propTypes.string,
  onClose: propTypes.func,
  children: propTypes.node.isRequired,
};

LayoutModal.defaultProps = {
  title: 'Модалка',
  onClose: () => {}
};

export default React.memo(LayoutModal);
