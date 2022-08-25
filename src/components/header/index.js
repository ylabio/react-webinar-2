import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';

import './styles.css'

const Header = (props) => {

  const cn = bem('Header');

  return (
    <div className={cn()}>
      {props.children}
    </div>
  );
};

Header.propTypes = {
  children: propTypes.node
}
Header.defaultProps={

}

export default React.memo(Header);