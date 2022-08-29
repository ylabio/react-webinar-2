import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {Link} from 'react-router-dom';
import './style.css';

function InfoBadge(props) {
  const cn = bem('InfoBadge');

  return (
    <div className={cn()}>
      <Link to={'/login'}>Войдите</Link>, чтобы иметь возможность комментировать
    </div>
  );
}

InfoBadge.propTypes = {};

InfoBadge.defaultProps = {};

export default React.memo(InfoBadge);
