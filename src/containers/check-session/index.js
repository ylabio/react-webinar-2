import React, { useEffect } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Spinner from '../../components/wrappers/spinner';
import useInit from '../../hooks/use-init';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import isEmptyObject from '../../utils/is-empty-object';

function CheckSession({ children }) {

  const store = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  const select = useSelector(state => ({
    session: state.session,
    profile: state.profile
  }));

  useEffect(() => {

    async function loadingData() {
      if (!localStorage.getItem('token')) {
        console.log('Restart Session')
        await store.get('session').loadSession(localStorage.getItem('token'));
      }
      if (select.session.isLogged) {
        console.log('Profile');
        await store.get('profile').checkProfile(select.session.token);
      }
    }
    loadingData()

    return function clearProfile() {
      store.get('profile').clear();
    }
  }, [select.session.isLogged]);

  if ((!select.session.isLogged && !isEmptyObject(select.profile.user)) || select.session.error) {
    return <Navigate to='/login' state={{ from: location.pathname }} />
  }

  return children;
}

export default React.memo(CheckSession);