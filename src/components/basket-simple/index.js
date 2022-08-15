import React, {useContext} from "react";
import propTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import "./styles.css";
import {Link} from "react-router-dom";
import {LanguageContext} from "../../services/locale/context";
import Translation from "../../services/locale";

function BasketSimple({sum, amount, onOpen, currentLink}) {
  const cn = bem('BasketSimple');
  const {language} = useContext(LanguageContext);

  return (
    <div className={cn()}>
      <Link className={cn('link')}
            to={currentLink}>{Translation[language].actions.home}</Link>
      <div className={cn('right')}>
        <span className={cn('label')}>{Translation[language].basket.simple}</span>
        <span className={cn('total')}>
          {amount ?
            `${amount} ${Translation[language].basket.piece(amount)} / ${numberFormat(sum)} ₽` :
            `пусто`}</span>
        <button className={cn('button')} onClick={onOpen}>{Translation[language].actions.open}</button>
      </div>
    </div>
  )
}

BasketSimple.propTypes = {
  onOpen: propTypes.func.isRequired,
  sum: propTypes.number,
  amount: propTypes.number
}

BasketSimple.defaultProps = {
  sum: 0,
  amount: 0
}

export default React.memo(BasketSimple);
