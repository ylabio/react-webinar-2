import { cn as bem } from "@bem-react/classname";
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import locText from "../../utils/localization";
import './style.css';

function LayoutModal(props) {
  const cn = bem('LayoutModal');

  const frame = useRef();

  useEffect(() => {
    align();
  });

  window.onresize = () => { // проверим корректность отображения корзины после ресайза
    align();
  }

  const align = () => {
    let top = 10;
    if (window.innerWidth > frame.current.clientHeight) {
      top = Math.max(top, (window.innerHeight - frame.current.clientHeight) / 2 - top);
    }
    frame.current.style.marginTop = `${top}px`;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    }
  }

  return (
    <div className={cn()}>
      <div className={cn('frame')} ref={frame}>
        <div className={cn('head')}>
          <h1 className={cn('title')}>
            {props.title}
          </h1>
          <button className={cn('close')} onClick={props.onClose}>{locText("buttonClose")}</button>
        </div>
        <div className={cn('content')}>
          {props.children}
        </div>
      </div>
    </div>
  );
}

LayoutModal.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.node,
};

LayoutModal.defaultProps = {
  title: 'Модалка',
  onClose: () => {}
};

export default React.memo(LayoutModal);
