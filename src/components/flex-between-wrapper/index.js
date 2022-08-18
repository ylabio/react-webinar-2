import React from 'react';
import propTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import './style.css';

const FlexBetweenWrapper = ({children}) => {
  const cn = bem('Flex-between-wrapper');

    return (
    <div className={cn()}>
      {children}
    </div>
    );
};

FlexBetweenWrapper.propTypes = {
  children: propTypes.node.isRequired,
}

export default FlexBetweenWrapper;
