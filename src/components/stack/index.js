import React from 'react';
import {cn as bem} from '@bem-react/classname';
import propTypes from 'prop-types';
import './style.css';

function Stack({children, spacing}) {
  const cn = bem('Stack');

  return <div className={cn({spacing})}>{children}</div>;
}

Stack.propTypes = {
  children: propTypes.node,
  spacing: propTypes.string
};

export default React.memo(Stack);

//TODO: использовать LayoutFlex вместо || поковыряться с улучшениями
