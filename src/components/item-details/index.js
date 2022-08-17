import { cn as bem } from "@bem-react/classname";
import propTypes from 'prop-types';
import React, { useCallback } from 'react';
import numberFormat from '../../utils/number-format';
import useLanguage from "../../utils/use-language";
import './style.css';

function ItemDetails(props) {

  const cn = bem('Details');

  const callbacks = {
    onAdd: useCallback((e) => props.onAdd(props.info._id), [props.onAdd, props.info])
  };

  const lng = useLanguage();

  return (
    <div className={cn()}>
      <div className={cn('block')}>{props.info.description}</div>
      <div className={cn('block')}>{lng("country")} <b>{props.info.maidIn?.title} ({props.info.maidIn?.code})</b></div>
      <div className={cn('block')}>{lng("category")} <b>{props.info.category?.title}</b></div>
      <div className={cn('block')}>{lng("year")} <b>{props.info.edition}</b></div>
      <div className={cn('price')}><b>{lng("price")} {numberFormat(props.info.price)} ₽</b></div>
      <button className={cn('button')} onClick={callbacks.onAdd}>{lng("buttonAdd")}</button>
    </div>
  )
}

ItemDetails.propTypes = {
  info: propTypes.object.isRequired,
  onAdd: propTypes.func
}

ItemDetails.defaultProps = {
  onAdd: () => { }
}

export default React.memo(ItemDetails);