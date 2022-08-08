import React, {useCallback} from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from "prop-types";

function Footer({countAndSumCart}){
  const cn = bem('Footer');

  const cb = {
    showSum: useCallback(() => {
      const Sum = countAndSumCart();
      return Sum.sum;
    }, []),
    showCount: useCallback(() => {
      const Count = countAndSumCart();
      return Count.count;
    }, []),
  };

  return (
    <>
      {
        cb.showCount()
          ? <div className={cn()}>
              <div className={cn('text')}>
                Итого:
              </div>
              <div className={cn('sum')}>
                {cb.showSum().toLocaleString('ru-RU')} ₽
              </div>
            </div>
            : ''
      }
    </>
  )
}

Footer.propTypes = {
  countAndSumCart: propTypes.func.isRequired,
}

Footer.defaultProps = {
  countAndSumCart: () => {},
}

export default React.memo(Footer);