import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function SingleItemWrapper(props) {
  const cn = bem('Wrapper');

  return (
    <div className={cn()}>
      <div key={props.item.product._id}>{props.renderItem(props.item)}</div>
    </div>
  );
}

SingleItemWrapper.propTypes = {
  renderItem: propTypes.func,
};

SingleItemWrapper.defaultProps = {
  renderItem: (item) => {
    return item.toString();
  },
};

export default React.memo(SingleItemWrapper);
