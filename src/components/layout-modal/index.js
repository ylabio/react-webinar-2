import React, {useEffect, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function LayoutModal(props) {
  const cn = bem('LayoutModal');
  const { t } = useTranslation();

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
          <button className={cn('close')} onClick={props.onClose}>{t('LayoutModalClose')}</button>
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
  onClose: propTypes.func.isRequired,
  children: propTypes.node.isRequired,
};

LayoutModal.defaultProps = {
  title: 'Модалка',
};

export default React.memo(LayoutModal);
