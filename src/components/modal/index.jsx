import './style.css';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';

const Modal = ({ children, head, isOpen, onClose }) => {
  const cn = bem('Modal');
  return (
    <div className={cn({ is: isOpen ? 'opened' : 'closed' })}>
      <div className={cn('wrapper')}>
        <div className={cn('head')}>
          {head}
          <button className={cn('close-btn')} onClick={onClose}>
            Закрыть
          </button>
        </div>
        <div className={cn('content')}>{children}</div>
      </div>
      <div className={cn('Backdrop')} onClick={onClose}></div>
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

export default React.memo(Modal);
