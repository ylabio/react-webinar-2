import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import './styles.css';

function Logout({ userName, logout, waiting, t }) {
  return (
    <>
      <Link to={`/profile`} className="Logout-user">
        {userName}
      </Link>
      <button onClick={logout} disabled={waiting}>
        {t('auth.logout')}
      </button>
    </>
  );
}

Logout.propTypes = {
  userName: propTypes.string.isRequired,
  logout: propTypes.func.isRequired,
  waiting: propTypes.bool,
  t: propTypes.func,
};

Logout.defaultProps = {
  waiting: false,
  t: (text) => text,
};

export default Logout;
