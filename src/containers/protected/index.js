import React, {useEffect} from 'react';
import propTypes from 'prop-types';
import {useNavigate, useLocation} from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import {useSession} from '../../hooks/use-session';

function Protected({children, redirect}) {
  const navigate = useNavigate();
  const location = useLocation();

  const select = useSelector(state => ({
    exists: state.session.exists,
    waiting: state.session.waiting
  }));
  const {isDenied, isChecking} = useSession();
  useEffect(() => {
    if (isDenied) {
      navigate(redirect, {state: {back: location.pathname}});
    }
  }, [select.exists, select.waiting]);
  return isChecking ? <div>Проверка доступа...</div> : children;
}

Protected.propTypes = {
  redirect: propTypes.node,
  children: propTypes.node
};

export default React.memo(Protected);
