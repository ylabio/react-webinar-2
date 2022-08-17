import React from 'react';
import propTypes from 'prop-types';
import NavMenu from '../nav-menu';
import BasketSimple from '../basket-simple'
import './style.css';

function Controls(props){
  const {links} = props;
  return (
    <div className='Controls'>
      <NavMenu links={links}/>
      <BasketSimple onOpen={props.onOpen} amount={props.amount} sum={props.sum}/>
    </div>
  )
}

Controls.propTypes = {
  links: propTypes.array.isRequired,
  onOpen: propTypes.func.isRequired,
  amount: propTypes.number.isRequired,
  sum: propTypes.number.isRequired,
}

Controls.defaultProps = {
}

export default React.memo(Controls);
