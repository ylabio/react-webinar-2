import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useInit from '../../hooks/use-init';
import useSelector from '../../hooks/use-selector';

function AuthWrapper({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const select = useSelector(state => ({
    isLogged: state.user.isLogged,
  }));

  useInit(() => {
    if (!select.isLogged) {
      navigate('/login', { state: { from: location } });
    }
  }, [select.isLogged]);

  return (
    <>
      {children}
    </>
  );
};

export default React.memo(AuthWrapper);
