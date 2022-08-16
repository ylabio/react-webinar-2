import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Menu(props) {
  const cn = bem('Link');
  return (
    <div className={cn()}>
      <Link to='/' className={cn('item')}>
        {props.content.main}
      </Link>
    </div>
  );
}

Menu.propTypes = {
  content: propTypes.object.isRequired,
};

export default React.memo(Menu);
