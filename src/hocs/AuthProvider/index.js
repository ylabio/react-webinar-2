import React, {useEffect} from 'react';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';

function AuthProvider({children}) {
  const store = useStore();
  const select = useSelector(state => ({
    token: state.session.token
  }));

  useEffect(() => {
    store.get('session').checkToken();
  }, [select.token]);

  return <>{children}</>;
}

// AuthProvider.propTypes = {};

export default React.memo(AuthProvider);
