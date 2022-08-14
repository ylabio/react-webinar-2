import React from 'react';
import propTypes from 'prop-types';
import { dictionaryEnum } from '../../enums/dictionaryEnum';
import numberFormat from "../../utils/numberFormat";
import './styles.css';
import useSelector from '../../utils/use-selector';

function BasketTotal(props) {
  const select = useSelector(state => ({
	  lang: state.common.language
  }));

  return (
    <div className="BasketTotal">
      <span className="BasketTotal-cell">{dictionaryEnum.add[select.lang]}</span>
      <span className="BasketTotal-cell"> {numberFormat(props.sum)} ₽</span>
      <span className="BasketTotal-cell"/>
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
