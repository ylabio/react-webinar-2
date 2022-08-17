import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import './style.css';
import {useNavigate} from "react-router-dom";

function ArticleContent(props) {
  const cn = bem('ArticleContent');

  const callbacks = {
    onAdd: useCallback((e) => props.onAdd(props.item._id), [props.onAdd, props.item])
  };

  return (
    <div className={cn()}>
      <div className={cn('description')} >
        {props.item.description}
      </div>
      <div className={cn('country')} >
        {props.lang.madeIn}:&nbsp;
        <span>
          {props.content.country}&nbsp;
          ({props.content.code})
        </span>
      </div>
      <div className={cn('category')} >
        {props.lang.category}:&nbsp;
        <span>
          {props.content.category}
        </span>
      </div>
      <div className={cn('category')} >
        {props.lang.productionYear}:&nbsp;
        <span>
          {props.item.edition}
        </span>
      </div>
      <div className={cn('price')}>
        <span>
          {props.lang.price}:&nbsp;
          {numberFormat(props.item.price)} ₽
        </span>
      </div>
      <div className={cn('right')}>
        <button onClick={callbacks.onAdd}>{props.lang.add}</button>
      </div>
    </div>
  )
}

ArticleContent.propTypes = {
  item: propTypes.object.isRequired,
  content: propTypes.object.isRequired,
  onAdd: propTypes.func,
  lang: propTypes.object,
}

ArticleContent.defaultProps = {
  onAdd: () => {},
  lang: {},
}

export default React.memo(ArticleContent);
