import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import './style.css';

function ItemDescription(props) {
  const cn = bem('ItemDescription');
  return (
    <div className={cn()}>
      <span className={cn('description')}>
        {props.description}
      </span>
      <span className={cn('title')}>
        {props.words.manufacturer}: <span className={cn('data')}>{props.manufacturer ?? props.words.loading}</span>
      </span>
      <span className={cn('title')}>
        {props.words.category}: <span className={cn('data')}>{props.category ?? props.words.loading}</span>
      </span>
      <div className={cn('title')}>
        {props.words.productionYear}: <span className={cn('data')}>{props.yearOfProduction ?? props.words.loading}</span>
      </div>
      <div className={cn('price')}>
        {props.words.price}: <span>{numberFormat(props.price) ?? props.words.loading} ₽</span>
      </div>
      <div className={cn('addButton')}>
        <button onClick={() => props.onAddCallback(props._id)}>{props.words.add}</button>
      </div>
    </div>
  )
}

ItemDescription.propTypes = {
  description: propTypes.string,
  manufacturer: propTypes.string,
  yearOfProduction: propTypes.number,
  category: propTypes.string,
  price: propTypes.number,
  words: propTypes.object.isRequired,
  _id: propTypes.string.isRequired,
  onAddCallback: propTypes.func.isRequired
}

ItemDescription.defaultProps = {
  description: "",
  manufacturer: "",
  yearOfProduction: 1970,
  category: "",
  price: 0
}

export default React.memo(ItemDescription);
