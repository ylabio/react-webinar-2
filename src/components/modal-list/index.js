import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import ModalItem from '../modal-item';

function ModalList(props) {

  const cn = bem('ModalList');

  return (
    <div className={cn()}>{props.items.map(item =>
      <div key={item.code} className={cn('item')}>
        <ModalItem item={item}
                   items={props.items}
                   onDeleteItems={props.onDeleteItems}/>
      </div>
    )}
    </div>
  )
}

ModalList.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onDeleteItems: propTypes.func
}

ModalList.defaultProps = {
  items: [],
  onDeleteItems: () => {}
}

export default React.memo(ModalList);
