import { cn as bem } from "@bem-react/classname";
import propTypes from "prop-types";
import React from 'react';
import { Link } from "react-router-dom";
import './style.css';

function UserBarForm(props) {
  const cn = bem('Userbar');
  
  return (
    <div className={cn()}>
      {props.name
        ?
          <>
            <Link className={cn('link')} to={props.link}>{props.name}</Link>
            <button className={cn('button')} onClick={props.onLogout}>{props.t('userbar.logout')}</button>
          </>
        :
          <button className={cn('button')} onClick={props.onLogin}>{props.t('userbar.login')}</button>
      }
    </div>
  );
};

UserBarForm.propTypes = {
  link: propTypes.string.isRequired,
  name: propTypes.string,
  onLogin: propTypes.func,
  onLogout: propTypes.func,
  t: propTypes.func
}

UserBarForm.defaultProps = {
  /* name: 'Star Noob', */
  onLogin: () => {},
  onLogout: () => {},
  t: (text) => text
}

export default React.memo(UserBarForm);