import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import LoginRequest from '../../components/login-request';

function ProtectedComment({ children, cancel }) {
  const navigate = useNavigate();
  const location = useLocation();

  const select = useSelector((state) => ({
    exists: state.session.exists,
    waiting: state.session.waiting,
  }));

  const onLoginClick = () => {
    navigate('/login', { state: { back: location.pathname } });
  };

  return !select.exists || select.waiting ? (
    <LoginRequest onLoginClick={onLoginClick} cancel={cancel} />
  ) : (
    children
  );
}

ProtectedComment.propTypes = {
  cancel: propTypes.node,
  children: propTypes.node,
};

export default React.memo(ProtectedComment);
