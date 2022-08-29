import React from "react";
import LayoutFlex from "../../layouts/layout-flex";
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';

function AuthFalseControls({onSignIn, t}) {

  // CSS классы по БЭМ
  const cn = bem('AuthFalseControls');

  return (
    <LayoutFlex flex="end" indent="small">
      <button className={cn('in')} onClick={onSignIn}>{t('session.signIn')}</button>
    </LayoutFlex>
  );
}

AuthFalseControls.propTypes = {
  onSignIn: propTypes.func,
  t: propTypes.func
}

AuthFalseControls.defaultProps = {
  onSignIn: () => {},
  t: (text) => text
}


export default React.memo(AuthFalseControls);
