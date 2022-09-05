import React, { useEffect } from "react";
import propTypes from "prop-types";
import useSelector from "../../hooks/use-selector";
import { Link } from "react-router-dom";

function ProtectedItem({ children, noexist, waiting }) {
  const select = useSelector((state) => ({
    exists: state.session.exists,
    waiting: state.session.waiting,
  }));

  useEffect(() => {}, [select.exists, select.waiting]);

  if (!select.exists && !select.waiting) return noexist;
  if (select.waiting) return waiting;
  return children;
}

ProtectedItem.propTypes = {
  children: propTypes.node,
  noexist: propTypes.node,
  waiting: propTypes.node,
};

ProtectedItem.defaultProps = {
  noexist: <Link to={"/login"}>Войдите</Link>,
  waiting: <div>Проверка доступа...</div>,
};

export default React.memo(ProtectedItem);
