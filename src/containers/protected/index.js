import React, {useEffect} from "react";
import propTypes from "prop-types";
import { useNavigate, useLocation } from "react-router-dom";
import useSelector from "../../hooks/use-selector";

function Protected({children, redirect}) {

  const navigate = useNavigate();
  const location = useLocation();

  const select = useSelector(state => ({
    exists: state.session.exists,
    waiting: state.session.waiting
  }));

  useEffect(() => {
    if (!select.exists && !select.waiting) {
      navigate(redirect, {state: { back: location.pathname }});
    }
  }, [select.exists, select.waiting]);

  return !select.exists || select.waiting ? <div>Проверка доступа...</div> : children ;
}

Protected.propTypes = {
  redirect: propTypes.node,
  children: propTypes.node,
}

export default React.memo(Protected);
