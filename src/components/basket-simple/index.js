import React from 'react';
import propTypes from 'prop-types';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";
import {Link} from 'react-router-dom';
import numberFormat from "../../utils/number-format";
import './styles.css';


function BasketSimple({sum, amount, onOpen, lang, dictionary, skipPage}) {
  const cn = bem('BasketSimple');
  return (
    <div className={cn()}>
      <Link to={'/'+(skipPage/10+1)} className={cn('toMain')}>{dictionary.main[lang]}</Link>
      <div className={cn('info')}>
        <span className={cn('label')}>{dictionary.cartIn[lang]}</span>
        <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, dictionary.item0[lang], dictionary.item1[lang], dictionary.item2[lang])} / ${numberFormat(sum)} ₽`
          : dictionary.empty[lang]
        }
      </span>
      <button className='BasketSimple__button' onClick={onOpen}>{dictionary.move[lang]}</button>
      </div>
    </div>
  )
}

BasketSimple.propTypes = {
  onOpen: propTypes.func.isRequired,
  dictionary: propTypes.object.isRequired,
  lang: propTypes.number.isRequired,
  sum: propTypes.number,
  amount: propTypes.number,
  skipPage: propTypes.number
}

BasketSimple.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
  skipPage: 0
}

export default React.memo(BasketSimple);
