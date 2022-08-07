import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Popup({onClose, title, children}) {
  const cn = bem('Popup');

  return (
    <div className={cn()}>
      <div className={cn('content')}>
        <div className={cn('title-block')}>
          <div className={cn('title')}>{title}</div>
          <button className={cn('button')} onClick={onClose}>
            <div className={cn('close')}>Закрыть</div>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

// List.propTypes = {
//   items: propTypes.arrayOf(propTypes.object).isRequired,
//   onItemDelete: propTypes.func,
//   onAddToCart: propTypes.func
// }

// List.defaultProps = {
//   items: [],
//   onItemDelete: () => {}
// }

export default React.memo(Popup);
