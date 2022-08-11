import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import Item from "../item";
import './style.css';

function List(props) {
  const cn = bem('List');
  const Component = props.component;
  return (
    <div className={cn()}>{props.items.map((item, i) =>
      <div key={item.code} className={cn('item')}>
        <Component
          item={item}
          position={++i}
          callback={props.callback}
          text={props.text}
        />
      </div>
    )}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object),
  text: propTypes.string.isRequired,
  component: propTypes.object,
  callback: propTypes.func
}

List.defaultProps = {
  items: [],
  callback: () => {}
}

export default React.memo(List);
