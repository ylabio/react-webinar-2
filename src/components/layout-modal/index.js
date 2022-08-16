import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';


function LayoutModal(props) {
  const cn = bem('LayoutModal');

  const frame = useRef();

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
          <button className={cn('close')} onClick={props.onClose}>{props.translate(props.language, props.codesLayoutModal.CODE_16) || 'Закрыть'}</button>
        </div>
        <div className={cn('content')}>
          {props.children}
        </div>
      </div>
    </div>
  );
}

LayoutModal.propTypes = {
  codesLayoutModal: PropTypes.object.isRequired,
  translate: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  language: PropTypes.string.isRequired,
};

LayoutModal.defaultProps = {
  codesLayoutModal: {},
  translate: () => {},
  title: 'Модалка',
  onClose: () => {}
};

export default React.memo(LayoutModal);
