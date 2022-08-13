import React, {useCallback} from 'react';
import {Link} from 'react-router-dom';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onAdd: useCallback((e) => {props.onAdd(props.item._id);
    }, [props.onAdd, props.item]),
    openArticle: useCallback((e) => {props.openArticle(props.item._id);
    }, [props.openArticle, props.item])
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <Link to={'/article/'+props.item._id} className={cn('title__pointer')} onClick={callbacks.openArticle}>{props.item.title}</Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>Добавить</button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func,
  openArticle: propTypes.func,
}

Item.defaultProps = {
  onAdd: () => {},
  openArticle: () => {},
}

export default React.memo(Item);
