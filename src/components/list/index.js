import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from 'prop-types';

function List({  
  items, 
  ListItem, 
  cb, 
  isModal, 
}) {
  const cn = bem('List');

  return (
    <ul className={cn()}>
      {items.map(item =>
        <li 
          key={isModal ? item.data.code : item.code} 
          className={cn('item')}
        >
          <ListItem 
            item={item}
            cb={cb}
          />
        </li>
      )}
    </ul>
  );
}

List.propTypes = { 
  items: propTypes.array.isRequired,
  cb: propTypes.func.isRequired,
  isModal: propTypes.bool.isRequired,
  ListItem: propTypes.elementType.isRequired
};

List.defaultProps = {
  items: [],
  cb: () => {},
  isModal: false,
  ListItem: () => <></>,
};

export default React.memo(List);
