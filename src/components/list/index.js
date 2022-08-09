import React, {Children, useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function List(props) {
  const cn = bem('List');
  return(
    <div className={cn()}>
      {props.children}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
}

List.defaultProps = {
  items: [],
}

export default React.memo(List);
