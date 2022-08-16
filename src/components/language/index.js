import React from 'react';
import {cn as bem} from '@bem-react/classname';
import propTypes from 'prop-types';
import './style.css';

function Language({onToggle, lang}) {
  const cn = bem('Language');

  return (
    <div className={cn()}>
      <button className={cn('button')} onClick={onToggle}>
        {lang.toUpperCase()}
      </button>
    </div>
  )
}

Language.propTypes = {
  lang: propTypes.string.isRequired,
  onToggle: propTypes.func.isRequired,
}

Language.defaultProps = {
}

export default React.memo(Language);
