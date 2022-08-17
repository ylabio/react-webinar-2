import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import Menu from '../menu';
import BasketSimple from '../basket-simple';

function Controls(props) {
  return (
    <div className="Controls">
      <Menu links={props.links}></Menu>
      <BasketSimple
        onOpen={props.onOpen}
        amount={props.amount}
        sum={props.sum}
        dictionary={props.dictionary}
      />
    </div>
  );
}

Controls.propTypes = {
  links: propTypes.array,
  onOpen: propTypes.func,
  amount: propTypes.number,
  sum: propTypes.number,
  dictionary: propTypes.object,
};

Controls.defaultProps = {};

export default React.memo(Controls);
