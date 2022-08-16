import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import Language from '../language'
import './style.css';
import BasketSimple from '../basket-simple';
import Menu from '../menu';

function Layout(props){
  const cn = bem('Layout');

  return (
    <div className={cn()}>
      <div className={cn('header')}>
        <div className={cn('head')}>{props.head}</div>
        <Language setLang={props.setLang} change={props.change}/>
        <Menu urlToPage={props.urlToPage}
              main={props.dictionary.main[props.lang]}/>
        <BasketSimple onOpen={props.onOpen} 
                      amount={props.amount} 
                      sum={props.sum} 
                      lang={props.lang} 
                      openText={props.openText}
                      cartInText={props.cartInText}
                      item0={props.item0}
                      item1={props.item1}
                      item2={props.item2}
                      empty={props.empty}/>
      </div>
      <div className={cn('content')}>
        {props.children}
      </div>
    </div>
  )
}

Layout.propTypes = {
  head: propTypes.node,
  children: propTypes.node,
  setLang: propTypes.func.isRequired,
  urlToPage: propTypes.string.isRequired,
  dictionary: propTypes.object.isRequired,
  lang: propTypes.number.isRequired,
  amount: propTypes.number.isRequired,
  sum: propTypes.number.isRequired,
  onOpen: propTypes.func.isRequired,
  openText: propTypes.string.isRequired,
  cartInText: propTypes.string.isRequired,
  item0: propTypes.string.isRequired,
  item1: propTypes.string.isRequired,
  item2: propTypes.string.isRequired,
  empty: propTypes.string.isRequired,
  change: propTypes.string.isRequired
}

Layout.defaultProps = {
  setLang: () => {},
  onOpen: () => {}
}

export default React.memo(Layout);
