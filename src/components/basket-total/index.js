import React from 'react';
import {useTranslation} from 'react-i18next';
import propTypes from 'prop-types';
import numberFormat from "../../utils/numberFormat";
import './styles.css';

function BasketTotal({sum}) {
  const { t } = useTranslation();

  return (
    <div className="BasketTotal">
      <span className="BasketTotal-cell">{t('BasketTotalTitle')}</span>
      <span className="BasketTotal-cell"> {numberFormat(sum)} ₽</span>
      <span className="BasketTotal-cell"></span>
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
