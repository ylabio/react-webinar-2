import React from 'react';
import {Link} from 'react-router-dom';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './styles.css';

function Menu({urlToPage, main}) {
  const cn = bem('Menu');

  return (
    <div className={cn()}>
        <Link to={urlToPage} className={cn('toMain')}>{main}</Link>
    </div>
  )
}

Menu.propTypes = {
    urlToPage: propTypes.string.isRequired,
    main: propTypes.string.isRequired
}

Menu.defaultProps = {
}

export default React.memo(Menu);
