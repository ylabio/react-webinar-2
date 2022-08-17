import React from "react";
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from '../../utils/number-format';
import localization from './localization';
import './style.css';

function ItemDescription(props) {  
  const cn = bem('ItemDescription');

  return ( 
    <div className={cn()}>
      <div className={cn('element')}>{props.item.description}</div> 
      <div className={cn('element')}>
        {localization[props.lang].country} <span>{props.item.maidIn.title} ({props.item.maidIn.code})</span>
      </div>
      <div className={cn('element')}>
        {localization[props.lang].category} <span>{props.item.category.title}</span>
      </div>
      <div className={cn('element')}>
        {localization[props.lang].year} <span>{props.item.edition}</span>
      </div>
      <div className={cn('element')}>
        <span className={cn('price')}>{localization[props.lang].price}&nbsp;&nbsp;{numberFormat(props.item.price)} ₽</span>
      </div>
      <button onClick={() => props.onAdd(props.item._id)}>
        {localization[props.lang].btnAdd}
      </button>
    </div>
  );
}

ItemDescription.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func.isRequired,
  lang: propTypes.string.isRequired
}

ItemDescription.defaultProps = {
  lang: "RU"
}

export default React.memo(ItemDescription);