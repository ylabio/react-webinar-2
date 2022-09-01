import React, { useCallback } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import propTypes from 'prop-types';
import './style.css';

const UnloggedUser = ({ linkText, message }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const redirect = useCallback(() => {
    navigate('/login', {
      state: { back: location.pathname }
    });
  }, [location.pathname]);

  return (
    <div className='unlogged-user'>
      <button className='unlogged-user__link' onClick={redirect}>{linkText}</button>
      <p className='unlogged-user__message'>{message}</p>
    </div>
  )
}

UnloggedUser.propTypes = {
  linkText: propTypes.string,
  message: propTypes.string,
};

UnloggedUser.defaultProps = {
  linkText: 'Войдите',
  message: ', чтобы иметь возможность комментирования',
};

export default React.memo(UnloggedUser);