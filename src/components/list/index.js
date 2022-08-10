import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import Item from "../item";
import './style.css';

function List({ items, action }) {
  const cn = bem('List');

  return (
    <div className={cn()}>

      { 
        items.map(item => <div key={item.code} className={cn('item')}>
          <Item item={item}
                action={action}/>
        </div>) 
      }

    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  action: propTypes.func
}

List.defaultProps = {
  action: () => {}
}

export default React.memo(List);
