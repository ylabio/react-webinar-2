import React from 'react';
import {cn as bem} from "@bem-react/classname";
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
function ToMainLink(props) {
  const cn = bem('ToMainLink');

 

  return (
    <div
        onClick={props.toNull}
    >
      <Link 
        to="/"
      >Главная</Link>
    </div>
  )
}

ToMainLink.propTypes = {
    toNull: propTypes.func.isRequired,
}

ToMainLink.defaultProps = {
    toNull: () => {}
}

export default React.memo(ToMainLink);
