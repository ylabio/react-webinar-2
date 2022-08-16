import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import localization from './localization';
import './style.css';

function Controls(props){
  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <div className={cn('link')}>
        {props.linkRender(localization[props.lang].linkMain)}
      </div>
      {props.children}
    </div>
  )
}

Controls.propTypes = {
  linkRender: propTypes.func.isRequired,
  lang: propTypes.string
}

Controls.defaultProps = {
  lang: "RU"
}

export default React.memo(Controls);
