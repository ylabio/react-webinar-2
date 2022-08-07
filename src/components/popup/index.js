import React, {useCallback} from 'react';
import propTypes, { string } from 'prop-types';
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

Popup.propTypes = {
  children: propTypes.object.isRequired,
  title: propTypes.string,
  onClose: propTypes.func
}

Popup.defaultProps = {
  onClose: () => {}
}

export default React.memo(Popup);
