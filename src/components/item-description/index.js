import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import './style.css';
import {localization} from '../../utils/translations';
import useSelector from '../../utils/use-selector';

function ItemDescription(props) {
  const cn = bem('ItemDescription');
  const callbacks = {
    onAdd: useCallback(() => props.onAddCallback(props.item._id), [props.onAdd, props.item])
  };
  const language = localization[useSelector(state => state.languages).language];
  return (
    <div className={cn()}>
      <span className={cn('description')}>
        {props.item.description}
      </span>
      <span className={cn('title')}>
        {language.manufacturer}: <span className={cn('data')}>{props.country}</span>
      </span>
      <span className={cn('title')}>
        {language.category}: <span className={cn('data')}>{props.category}</span>
      </span>
      <div className={cn('title')}>
        {language.productionYear}: <span className={cn('data')}>{props.item.edition ?? language.loading}</span>
      </div>
      <div className={cn('price')}>
        {language.price}: <span>{props.item.price ? numberFormat(props.item.price) : language.loading} ₽</span>
      </div>
      <div className={cn('addButton')}>
        <button onClick={callbacks.onAdd}>{language.add}</button>
      </div>
      {/*<div className={cn('right')}>*/}
      {/*  <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>*/}
      {/*  <button onClick={callbacks.onAdd}>Добавить</button>*/}
      {/*</div>*/}
    </div>
  )
}

ItemDescription.propTypes = {
  item: propTypes.object.isRequired,
  category: propTypes.string.isRequired,
  country: propTypes.string.isRequired,
  onAddCallback: propTypes.func.isRequired
}

export default React.memo(ItemDescription);
