import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function TextButton({children, ...props}) {
  const cn = bem('TextButton');

  return (
    <button className={cn()} {...props}>
      {children}
    </button>
  );
}

TextButton.propTypes = {
children: propTypes.node
};

export default React.memo(TextButton);
