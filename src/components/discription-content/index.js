import React from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/number-format";
import './styles.css';
import MLText from '../../utils/mul-lang-text';
import {cn as bem} from "@bem-react/classname";

const cn = bem('Descriptions');

function DiscriptionContent(props) {
  return (
    <div className={cn('content')}>
      <div className={cn('description')}>{props.select.description}</div>
      <div>{MLText('made')}: <span className={cn('post')}>{props.select.madeIn} ({props.select.madeInCode}) </span></div>
      <div>{MLText('type')}: <span className={cn('post')}>{props.select.category}</span></div>
      <div>{MLText('date')}: <span className={cn('post')}>{props.select.edition}</span></div>
      <div> <span className={cn('price')}>{MLText('price')}: {numberFormat(props.select.price)} ₽</span></div>
      <div><button onClick={()=>{props.addToBasket(props.id)}}>{MLText('addBtn')}</button></div>
      </div>
  )
}

DiscriptionContent.propTypes = {
  item: propTypes.object,
  id: propTypes.string,
  addToBasket: propTypes.func
}

DiscriptionContent.defaultProps = {
  item: {},
  id:'0',
}

export default React.memo(DiscriptionContent);
