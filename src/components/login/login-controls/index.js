import propTypes from 'prop-types';
import React, {useCallback} from 'react';
import {Link} from 'react-router-dom';
import LayoutFlex from '../../layouts/layout-flex';

function LoginControls({isSigned, username, profileUrl, loginUrl, text, onLogin, onLogout}) {
  const callbacks = {
    onLogin: useCallback(() => onLogin(loginUrl), [loginUrl])
  };

  return (
    <>
      {isSigned ? (
        <LayoutFlex flex={'with-gap'} padding={false}>
          <Link to={profileUrl}>{username}</Link>
          <button onClick={onLogout}>{text.logout}</button>
        </LayoutFlex>
      ) : (
        <>
          <button onClick={callbacks.onLogin}>{text.login}</button>
        </>
      )}
    </>
  );
}

LoginControls.propTypes = {
  isSigned: propTypes.bool.isRequired,
  text: propTypes.objectOf(propTypes.string).isRequired,
  username: propTypes.string,
  profileUrl: propTypes.string,
  loginUrl: propTypes.string,
  onLogin: propTypes.func,
  onLogout: propTypes.func
};

LoginControls.defaultProps = {
  profileUrl: '/profile',
  loginUrl: '/login'
};

export default React.memo(LoginControls);
