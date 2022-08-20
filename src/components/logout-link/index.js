import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { useNavigate } from 'react-router-dom';
import './style.css';
import getCookies from '../../utils/get-cookies';

function LogoutLink(props) {
  const cn = bem('LogoutLink');
  const navigate = useNavigate();

  const logOut = () => {
    props.onOut(getCookies().token);
  };
  const checkUser = () => {
    props.checkUser(getCookies().token);
  };

  React.useEffect(() => {
    if (props.directTo === 'login') {
      props.resetState();
      return navigate('/login');
    }
    if (props.directTo === 'profile') {
      navigate('/profile');
      return props.resetRedirect();
    }
  }, [props.directTo]);

  return (
    <div className={cn()}>
      <p onClick={checkUser}>{props.userName}</p>
      <button onClick={logOut}>{props.lableButton}</button>
    </div>
  );
}

LogoutLink.propTypes = {
  onOut: propTypes.func,
  checkUser: propTypes.func,
  resetRedirect: propTypes.func,
  resetState: propTypes.func,
  userName: propTypes.string,
  directTo: propTypes.string,
  lableButton: propTypes.string,
};

LogoutLink.defaultProps = {
  onOut: () => {},
  checkUser: () => {},
};

export default React.memo(LogoutLink);
