import React from 'react';
import {cn as bem} from '@bem-react/classname';
import propTypes from 'prop-types';
import './styles.css'

const TopMenu = (props) => {
  const cn = bem('TopMenu')
  return (
    <div className={cn()}>
      {props.children}
    </div>
  );
};

TopMenu.propTypes = {
  children: propTypes.node
}

export default React.memo(TopMenu);