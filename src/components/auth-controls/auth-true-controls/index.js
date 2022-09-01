import React from "react";
import LayoutFlex from "../../layouts/layout-flex";
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';
import {Link} from "react-router-dom";

function AuthTrueControls({onSignOut, t, userName, link}) {

  // CSS классы по БЭМ
  const cn = bem('AuthTrueControls');

  return (
    <LayoutFlex flex="end" indent="small">
      <Link className={cn('user')} to={link}>{userName}</Link>
      <button className={cn('out')} onClick={onSignOut}>{t('session.signOut')}</button>
    </LayoutFlex>
  );
}

AuthTrueControls.propTypes = {
  onSignOut: propTypes.func,
  t: propTypes.func,
  userName: propTypes.string,
  link: propTypes.string
}

AuthTrueControls.defaultProps = {
  onSignOut: () => {},
  t: (text) => text,
  userName: '',
  link: ''
}

export default React.memo(AuthTrueControls);
