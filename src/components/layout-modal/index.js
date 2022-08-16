import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from "prop-types";

function LayoutModal({children, onClose, ln = {}}) {
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
            {ln.title}
          </h1>
          <button className={cn('close')} onClick={onClose}>{ln.close}</button>
        </div>
        <div className={cn('content')}>
          {children}
        </div>
      </div>
    </div>
  );
}

LayoutModal.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.node,
  ln: propTypes.objectOf(propTypes.string).isRequired,
};

LayoutModal.defaultProps = {
  onClose: () => {}
};

export default React.memo(LayoutModal);
