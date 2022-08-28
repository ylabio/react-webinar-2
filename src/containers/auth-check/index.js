import React, {useEffect} from "react";
import propTypes from 'prop-types';
import useSelector from "../../hooks/use-selector";
import {useNavigate} from "react-router-dom";

function AuthCheck({children}) {

  const select = useSelector(state => ({
    user: state.session.user,
    isLoading: state.session.isLoading,
    loadingError: state.session.loadingError
  }));

  const navigate = useNavigate();

  useEffect(() => {
    if (!(select.user || select.isLoading) || !localStorage.getItem('TOKEN') || select.loadingError) {
      navigate('/login')
    }
  }, [select.user, select.loadingError, select.isLoading, navigate])

  return (
    <>
      {children}
    </>
  )
}

AuthCheck.propTypes = {
  children: propTypes.node
}

AuthCheck.defaultProps = {
  children: ''
}

export default React.memo(AuthCheck);
