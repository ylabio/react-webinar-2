import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import LayoutFlex from '../layout-flex';
import './styles.css';

function AuthPanel(props) {
  const cn = bem('AuthPanel');
  
  return (
    <div className={cn()}>
      <LayoutFlex flex="end" padding={false}>
        {props.link}
        <button onClick={props.onClick}>{props.text}</button>
      </LayoutFlex>
    </div>
  )
}

AuthPanel.propTypes = {
  onClick: propTypes.func,
  link: propTypes.node,
  text: propTypes.string.isRequired
}

AuthPanel.defaultProps = {
  link: <></>,
  onClick: () => {}
}

export default React.memo(AuthPanel);