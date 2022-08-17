import React from 'react';
import propTypes from 'prop-types';
import plural from "plural-ru";
import { cn as bem } from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import { Link } from 'react-router-dom';
import useSelector from "../../utils/use-selector";
import './styles.css';


function BasketSimple({ sum, amount, onOpen }) {
  const state = useSelector(state => ({
    language: state.multilang.CurrentLang,
    modalName: state.modals.name
  }));
  const [open, close] = onOpen;
  const cn = bem('BasketSimple');
  const [a, b, c] = state.language.commodityDeclensions
  return (
    <div className={cn()}>
      <Link className="Main" to="/">
        <button onClick={() => { state.modalName ? close(false) : "" }} className='main-link-basket'>{state.language.productLink}</button>
      </Link>
      <div>
        <span className={cn('label')}>{state.language.inTheBasket}:</span>
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, a, b, c)} / ${numberFormat(sum)} ₽`
            : state.language.empty
          }
        </span>
        <Link to="/"><button className='BasketSimple__button' onClick={open}>{state.language.go}</button></Link>
      </div>
    </div>
  )
}

BasketSimple.propTypes = {
  onOpen: propTypes.array.isRequired,
  sum: propTypes.number,
  amount: propTypes.number
}

BasketSimple.defaultProps = {
  onOpen: [() => { }, () => { }],
  sum: 0,
  amount: 0
}

export default React.memo(BasketSimple);
