import React from 'react';
import propTypes from 'prop-types';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import './styles.css';
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import Menu from '../menu';
import BasketSimple from '../basket-simple';


function TopBar(props) {
  const cn = bem('TopBar');
  return (
    <div className={cn('')}>
      <Menu translate={props.translate}/>
      <BasketSimple onOpen={props.onOpen} amount={props.amount} sum={props.sum}/>
    </div>
  )
}

TopBar.propTypes = {
  onOpen: propTypes.func.isRequired,
  sum: propTypes.number,
  amount: propTypes.number
}

TopBar.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default React.memo(TopBar);
