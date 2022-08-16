import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import {Link} from 'react-router-dom';

function HomeButton({language}) {
  const cn = bem('HomeButton');

  return (
    <Link to={`/`} className={cn('') }>{language.mainPage}</Link>
  )
}

HomeButton.propTypes = {
  language: propTypes.object.isRequired
}

HomeButton.defaultProps = {
}

export default React.memo(HomeButton);
