import React from 'react';
import propTypes from "prop-types";
import {cn as bem} from '@bem-react/classname'
import './style.css';

function LoginPanel(props) {
  const cn = bem('LoginPanel');

  return (
    <div className={cn()}>
      <button onClick={props.log}>{props.title}</button>
    </div>
  )
}

LoginPanel.propTypes = {
  log: propTypes.func,
  title: propTypes.string,
}

LoginPanel.defaultProps = {
  log: () => {},
  title: 'btn',
}

export default React.memo(LoginPanel);
