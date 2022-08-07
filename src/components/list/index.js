import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function List(props) {
  const cn = bem('List');

  return (
    <div className={cn()}>
      {props.children}
    </div>
  )
}

List.propTypes = {
  children: propTypes.node.isRequired,
  callback: propTypes.func
}

List.defaultProps = {
  callback: () => {}
}

export default React.memo(List);
