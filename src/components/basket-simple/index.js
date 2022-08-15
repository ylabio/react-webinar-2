import { cn as bem } from "@bem-react/classname";
import plural from "plural-ru";
import propTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import locText from "../../utils/localization";
import numberFormat from "../../utils/number-format";
import useSelector from "../../utils/use-selector";
import './styles.css';


function BasketSimple({sum, amount, onOpen}) {
  const cn = bem('BasketSimple');

  const language = useSelector(state => state.localization.lang);
  useEffect(() => {}, [language]);

  const words = locText("topStatsGoods");

  return (
    <div className={cn()}>
      <Link to='/' className='LinkToMain'>{locText("toMain")}</Link>
      <div>
        <span className={cn('label')}>{locText("topStatsLabel")}</span>
        <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, words[0], words[1], words[2])} / ${numberFormat(sum)} ₽`
          : locText("empty")
        }
        </span>
        <button className={cn('go')} onClick={onOpen}>{locText("topToBasket")}</button>
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
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default React.memo(BasketSimple);
