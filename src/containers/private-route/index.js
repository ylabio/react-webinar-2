import React from 'react';
import propTypes from 'prop-types';
import useInit from '../../hooks/use-init';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const store = useStore();

  useInit(async () => {
    await store.get('profile').getProfile();
  }, []);

  const select = useSelector((state) => ({
    isAuth: state.auth.isAuth,
  }));

  if (!select.isAuth) {
    return <Navigate to={'/login'} />;
  }
  return children;
}

PrivateRoute.propTypes = {
  children: propTypes.node,
};

export default PrivateRoute;
