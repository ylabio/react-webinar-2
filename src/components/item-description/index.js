import React from "react";
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from '../../utils/number-format';
import useSelector from "../../utils/use-selector";
import localization from './localization';
import './style.css';

function ItemDescription(props) {  
  const cn = bem('ItemDescription');

  const select = useSelector(state => ({
    lang: state.localization.lang
  }));

  return ( 
    <div className={cn()}>
      <div className={cn('element')}>{props.item.description}</div> 
      <div className={cn('element')}>
        {localization[select.lang].country} <span>{props.item.maidIn.title} ({props.item.maidIn.code})</span>
      </div>
      <div className={cn('element')}>
        {localization[select.lang].category} <span>{props.item.category.title}</span>
      </div>
      <div className={cn('element')}>
      {localization[select.lang].year} <span>{props.item.edition}</span>
      </div>
      <div className={cn('element')}>
        <span className={cn('price')}>{localization[select.lang].price}&nbsp;&nbsp;{numberFormat(props.item.price)} ₽</span>
      </div>
      <button onClick={() => props.onAdd(props.item._id)}>
        {localization[select.lang].btnAdd}
      </button>
    </div>
  );
}

ItemDescription.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func.isRequired
}

export default React.memo(ItemDescription);