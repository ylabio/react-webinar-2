import React from 'react';
import { Navigate } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';

function Authorized(props) {
  const store = useStore();

  React.useEffect(() => {
    store.get('session').checkAccess(localStorage.getItem('token'));
  }, []);

  const isLogged = useSelector((state) => state.session.isLogged);

  if (!isLogged) {
    return <Navigate to="/login" />;
  }

  return props.children;
}

export default React.memo(Authorized);
