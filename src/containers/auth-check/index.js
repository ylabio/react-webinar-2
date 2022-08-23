import React from 'react';
import useSelector from '../../hooks/use-selector';
import { Navigate } from 'react-router-dom';
import propTypes from 'prop-types';

const AuthCheck = ({ children }) => {
  const { waiting, status, profile } = useSelector((s) => s.user);

  if (status !== 'confirm' && !profile.name) return <Navigate to="/sign_in" />;

  return waiting ? <div>loading...</div> : children;
};

AuthCheck.propTypes = {
  children: propTypes.node.isRequired,
};

export default React.memo(AuthCheck);
