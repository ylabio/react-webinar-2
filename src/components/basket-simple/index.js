import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import './styles.css';
import { Link } from 'react-router-dom';
import MLText from '../multi-lang/mul-lang-text';
import MlProd from '../multi-lang/mul-lang-prod';


function BasketSimple({sum, amount, onOpen}) {
  const cn = bem('BasketSimple');
  return (
    <div className={cn()}>
      <span className={cn('navigate')}><Link to='/'><MLText item={'main'}/></Link></span>
      <span className={cn('label')}><MLText item={'inBasket'}/>:</span>
      <span className={cn('total')}>
      {amount?<>{amount} <MlProd amount={amount}/> / {numberFormat(sum)} ₽</>
        : <MLText item={'empty'}/>
      }
      </span>
      <button className='BasketSimple__button' onClick={onOpen}><MLText item={'go'}/></button>
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
