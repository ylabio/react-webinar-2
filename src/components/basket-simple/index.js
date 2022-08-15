import { cn as bem } from "@bem-react/classname";
import plural from "plural-ru";
import propTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import numberFormat from "../../utils/number-format";
import useLanguage from "../../utils/use-language";
import './styles.css';


function BasketSimple({sum, amount, onOpen}) {
  const cn = bem('BasketSimple');

  const lng = useLanguage();
  const words = lng("topStatsGoods");

  return (
    <div className={cn()}>
      <Link to='/' className='LinkToMain'>{lng("toMain")}</Link>
      <div>
        <span className={cn('label')}>{lng("topStatsLabel")}</span>
        <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, words[0], words[1], words[2])} / ${numberFormat(sum)} ₽`
          : lng("empty")
        }
        </span>
        <button className={cn('go')} onClick={onOpen}>{lng("topToBasket")}</button>
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
