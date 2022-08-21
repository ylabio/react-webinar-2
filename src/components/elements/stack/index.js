import React from "react";
import propTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import 'style.css';

const Stack = ({children, px, py, spacing}) => {
  const cn = bem('Stack');

    return (
    <div className={cn({px, py, spacing})}>
      {children}
    </div>
    );
};

Stack.propTypes = {
  children: propTypes.node.isRequired,
  px: propTypes.oneOf(['none', 'small', 'normal', 'larger']),
  py: propTypes.oneOf(['none', 'small', 'normal', 'larger']),
  spacing: propTypes.oneOf(['none', 'small', 'normal', 'larger']),
}

Stack.defaultProps = {
  px: 'small',
  py: 'small',
  spacing: 'small',
}

export default Stack;
