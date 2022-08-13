import React, {useCallback} from 'react';
import {Link} from "react-router-dom";
import propTypes from 'prop-types';
import pluralize from 'pluralize';
import useSelector from '../../utils/use-selector';
import numberFormat from "../../utils/number-format";
import {cn as bem} from "@bem-react/classname";
import Translate from '../../components/translate';
import './styles.css';


function ItemBasket(props) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: useCallback((e) => props.onRemove(props.item._id), [props.onRemove,  props.item])
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('id')}>{props.item._id}</div>*/}
      <div className={cn('title')}>
        <Link to={`/article/${props.item._id}`} className={cn('link')} onClick={props.onClose}>{props.item.title}</Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)}{" "}
          {props.lang === 'ru' ? 'шт' : pluralize('item', props.item.amount)}
        </div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>
            <Translate>Удалить</Translate>
          </button>
        </div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
  lang: propTypes.string,
  onRemove: propTypes.func,
}

ItemBasket.defaultProps = {

}

export default React.memo(ItemBasket);
