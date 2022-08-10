import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function List(props) {
  const cn = bem('List');
  const Component = props.component

  return (
    <div className={cn()}>{props.items.map((item) =>
      <div key={item.code} className={cn('item')}>
        <Component item={item}  onHandleBtn={props.onHandleBtn}/>
      </div>
    )}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onHandleBtn: propTypes.func,
  component: propTypes.elementType.isRequired
}

List.defaultProps = {
  items: [],
  onHandleBtn: () => {}
}

export default React.memo(List);
