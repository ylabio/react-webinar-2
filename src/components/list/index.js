import React from 'react';
import propTypes, { string } from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import Item from "../item";
import './style.css';

function List(props) {

  const cn = bem('List');
  return (
    <div className={cn()}>{props.items.map(item =>
      <div key={item.code} className={cn('item')}>
        <Item item={item} callBack={props.callBack} title={props.buttonTitle} />
      </div>
    )}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  callBack: propTypes.func,
  buttonTitle: propTypes.node
}

List.defaultProps = {
  items: [],
  callBack: () => { },
}

export default React.memo(List);
