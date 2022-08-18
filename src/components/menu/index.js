import React from "react";
import {Link} from "react-router-dom";
import propTypes from "prop-types";

const Menu = ({ln = {}}) => {
    return (
    <div>
      <Link to={'/'}>{ln.home}</Link>
    </div>
    );
};

Menu.propTypes = {
  ln: propTypes.objectOf(propTypes.string).isRequired,
}

export default Menu;
