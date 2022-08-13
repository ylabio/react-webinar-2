import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import './style.css';
import useLanguage from '../../utils/use-language';
import {getLocalization} from '../../localization';

function ItemDescription(props) {
  const cn = bem('ItemDescription');
  const callbacks = {
    onAdd: useCallback(() => props.onAddCallback(props.item._id), [props.onAdd, props.item])
  };
  const localization = getLocalization(useLanguage())
  return (
    <div className={cn()}>
      <span className={cn('description')}>
        {props.item.description}
      </span>
      <span className={cn('title')}>
        {localization.manufacturer}: <span className={cn('data')}>{props.item.maidIn?.title ?? localization.loading}</span>
      </span>
      <span className={cn('title')}>
        {localization.category}: <span className={cn('data')}>{props.item.category?.title ?? localization.loading}</span>
      </span>
      <div className={cn('title')}>
        {localization.productionYear}: <span className={cn('data')}>{props.item.edition ?? localization.loading}</span>
      </div>
      <div className={cn('price')}>
        {localization.price}: <span>{numberFormat(props.item.price) ?? localization.loading} ₽</span>
      </div>
      <div className={cn('addButton')}>
        <button onClick={callbacks.onAdd}>{localization.add}</button>
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
  onAddCallback: propTypes.func.isRequired
}

export default React.memo(ItemDescription);
