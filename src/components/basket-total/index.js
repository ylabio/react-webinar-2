import React, { useContext } from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/number-format";
import './styles.css';
import { cn as bem } from "@bem-react/classname";
import { LanguageContext } from "../../services/language/context";
import Translation from "../../services/language";

function BasketTotal(props) {
  const cn = bem('BasketTotal');
  const { language } = useContext(LanguageContext);

  return (
    <div className={cn()}>
      <span className={cn('cell')}>{Translation[language].basket.total}</span>
      <span className={cn('cell')}> {numberFormat(props.sum)} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  )
}

BasketTotal.propTypes = {
  sum: propTypes.number
}

BasketTotal.defaultProps = {
  sum: 0
}

export default React.memo(BasketTotal);
