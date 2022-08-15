import React, {useCallback} from 'react';
import {useNavigate} from "react-router-dom";
import propTypes from 'prop-types';
import pluralize from 'pluralize';
import numberFormat from "../../utils/number-format";
import {cn as bem} from "@bem-react/classname";
import Translate from '../../components/translate';
import './styles.css';


function ItemBasket(props) {
  const cn = bem('ItemBasket');
  const navigate = useNavigate()

  const callbacks = {
    onRemove: useCallback((e) => props.onRemove(props.item._id), [props.onRemove,  props.item])
  };

  // При нажатии на продукт в корзине делаем переход и закрываем модалку
  const onClickItemBasket = (e) => {
    e.preventDefault()
    navigate(props.link)
    props.onClose()
  }

  return (
    <div className={cn()}>
      {/*<div className={cn('id')}>{props.item._id}</div>*/}
      <div className={cn('title')}>
        <a href='!#' onClick={onClickItemBasket} className={cn('link')}>{props.item.title}</a>
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
  link: propTypes.string.isRequired,
  onRemove: propTypes.func,
}

ItemBasket.defaultProps = {
  lang: 'ru'
}

export default React.memo(ItemBasket);
