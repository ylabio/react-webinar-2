import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Button({ children, onClick, className, ...props }) {
  const cn = bem('Button');

  return (
    <button className={cn(null, [className])} onClick={onClick} {...props}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: propTypes.node.isRequired,
  onClick: propTypes.func,
};

Button.defaultProps = {
  onClick: () => {},
};

export default React.memo(Button);
