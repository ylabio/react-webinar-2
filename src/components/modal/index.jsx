import './style.css';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import { useCallback, useEffect, useRef, useState } from 'react';



const Modal = ({ children, head, isOpen, onClose }) => {
  const [fade, setFade] = useState('out');
  const [isShown, setIsShown] = useState(false);
  const cn = bem('Modal');
  const timeout = useRef();

  const cb = {
    onModalClose: useCallback(() => {
      setFade('out');
      onClose();
      timeout.current = setTimeout(() => setIsShown(false), 1000);
    }, []),
  };

  useEffect(() => {
    if (isOpen) {
      if (timeout.current) clearTimeout(timeout.current);
      setFade(() => (isOpen && isShown ? 'in' : 'out'));
      setIsShown(true);
    }
  }, [isOpen, isShown]);

  if (!isShown && !isOpen) return null;

  return (
    <div className={cn({ fade })}>
      <div className={cn('wrapper')}>
        <div className={cn('head')}>
          {head}
          <button className={cn('close-btn')} onClick={cb.onModalClose}>
            Закрыть
          </button>
        </div>
        <div className={cn('content')}>{children}</div>
      </div>
      <div className={cn('Backdrop')} onClick={cb.onModalClose} />
    </div>
  );
};

Modal.propTypes = {
  head: propTypes.node,
  children: propTypes.node,
  isOpen: propTypes.bool.isRequired,
  onClose: propTypes.func.isRequired,
};

Modal.defaultProps = {
  head: <div>Модалка</div>,
  children: <div>Пусто (^>^)</div>,
};

export default React.memo(Modal, (prev, next) => {
  if (!prev.isOpen && !next.isOpen) return true;
  else false;
});
