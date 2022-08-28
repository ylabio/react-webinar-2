import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import './style.css';

function ListComments(props) {
  const cn = bem('ListComments');

  return (
    <div className={cn()}>
      {props.items.map(item =>
        <div key={item.id} className={cn('item')}>
          {props.renderItem(item, item.level)}
        </div>
      )}
    </div>
  )
}

ListComments.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  count: propTypes.number,
  renderItem: propTypes.func
}

ListComments.defaultProps = {
  items: [],
  count: 0,
  renderItem: (item, level) => {
    return item.toString()
  }
}

export default React.memo(ListComments)