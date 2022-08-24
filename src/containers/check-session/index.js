import React, { useEffect } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import isEmptyObject from '../../utils/is-empty-object';
import propTypes from 'prop-types';

function CheckSession({ children }) {

  const store = useStore();
  const location = useLocation();

  const select = useSelector(state => ({
    session: state.session,
    profile: state.profile
  }));

  useEffect(() => {

    async function loadingData() {
      if (!localStorage.getItem('token')) {
        await store.get('session').loadSession(localStorage.getItem('token'));
      }
      if (select.session.isLogged) {
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

CheckSession.propTypes = {
  children: propTypes.node
}

export default React.memo(CheckSession);