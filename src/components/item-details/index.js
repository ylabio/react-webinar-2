import { cn as bem } from "@bem-react/classname";
import propTypes from 'prop-types';
import React, { useCallback, useEffect } from 'react';
import locText from "../../utils/localization";
import numberFormat from '../../utils/number-format';
import useSelector from "../../utils/use-selector";
import './style.css';

function ItemDetails(props) {

  const cn = bem('Details');

  const callbacks = {
    onAdd: useCallback((e) => props.onAdd(props.info._id), [props.onAdd, props.info])
  };

  const language = useSelector(state => state.localization.lang);
  useEffect(() => {}, [language]);

  return (
    <div className={cn()}>
      <div className={cn('block')}>{props.info.description}</div>
      <div className={cn('block')}>{locText("country")} <b>{props.info.maidIn?.title} ({props.info.maidIn?.code})</b></div>
      <div className={cn('block')}>{locText("category")} <b>{props.info.category?.title}</b></div>
      <div className={cn('block')}>{locText("year")} <b>{props.info.edition}</b></div>
      <div className={cn('block')}>{locText("price")} <b>{numberFormat(props.info.price)} ₽</b></div>
      <button className={cn('button')} onClick={callbacks.onAdd}>{locText("buttonAdd")}</button>
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