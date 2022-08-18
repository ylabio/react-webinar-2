import React, {useEffect, useRef, useContext} from 'react';
import PropTypes, { string } from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import TextContentContext from '../../store/textcontext';

function LayoutModal(props) {
  const cn = bem('LayoutModal');
  const { CLOSE_BASKET } = useContext(TextContentContext)
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
          <button className={cn('close')} onClick={props.onClose}>{CLOSE_BASKET}</button>
        </div>
        <div className={cn('content')}>
          {props.children}
        </div>
      </div>
    </div>
  );
}

LayoutModal.propTypes = {
  text: PropTypes.string,
  title: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.node,
};

LayoutModal.defaultProps = {
  text: 'Удалить',
  title: 'Модалка',
  onClose: () => {}
};

export default React.memo(LayoutModal);
