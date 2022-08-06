import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Popup(props) {
  const cn = bem('Popup');

  return (
    <div className={props.isActive ? `${cn()} is-opened` : cn()}>
      <div className={cn('content')}>
        <div className={cn('title-block')}>
          <div className={cn('title')}>{props.title}</div>
          <div className={cn('button')}>
            <div className={cn('close')}>Закрыть</div>
          </div>
        </div>
        {props.children}
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
