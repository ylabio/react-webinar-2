import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { Link } from 'react-router-dom';

function LinkTo(props) {
  const cn = bem('Link');

  return (
    <Link to={props.linkTo} className={cn()}>
      {props.name}
    </Link>
  );
}

LinkTo.propTypes = {
  linkTo: propTypes.string,
  name: propTypes.string,
};

LinkTo.defaultProps = {
  linkTo: '/',
};

export default React.memo(LinkTo);
