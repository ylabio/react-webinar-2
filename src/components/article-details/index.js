import React, {useCallback, useContext} from "react";
import propTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import "./style.css";
import {LanguageContext} from "../../services/locale/context";
import Translation from "../../services/locale";

function ArticleDetails(props) {
  const cn = bem('ArticleDetails');
  const {language} = useContext(LanguageContext);

  const callbacks = {
    onAdd: useCallback((e) => props.onAdd(props.item.id), [props.onAdd, props.item])
  };

  return (
    <div className={cn()}>
      <div className={cn('description')}>{props.item.description}</div>
      <div className={cn('country')}>{Translation[language].item.country}: <span className={cn('bold')}>{props.item.country} ({props.item.countryCode})</span></div>
      <div className={cn('category')}>{Translation[language].item.category}: <span className={cn('bold')}>{props.item.category}</span></div>
      <div className={cn('edition')}>{Translation[language].item.edition}: <span className={cn('bold')}>{props.item.editionYear}</span></div>
      <div className={cn('price')}>{Translation[language].item.price}: {numberFormat(props.item.price)} ₽</div>
      <button className={cn('button')}
              onClick={callbacks.onAdd}>{Translation[language].actions.add}</button>
    </div>
  )
}

ArticleDetails.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func,
}

ArticleDetails.defaultProps = {
  onAdd: () => {},
}

export default React.memo(ArticleDetails);
