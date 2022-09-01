import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {Link, useLocation} from 'react-router-dom';
import './style.css';

function InfoBadge(props) {
  const cn = bem('InfoBadge');
  const location = useLocation();

  return (
    <div className={cn()}>
      <Link to={'/login'} state={{back: location.pathname}}>
        Войдите
      </Link>
      , чтобы иметь возможность комментировать
    </div>
  );
}

InfoBadge.propTypes = {};

InfoBadge.defaultProps = {};

export default React.memo(InfoBadge);
