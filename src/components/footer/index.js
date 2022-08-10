import React, {useCallback} from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from "prop-types";

function Footer({countAndSum}){
  const cn = bem('Footer');

  return (
    <>
      {
        countAndSum.count
          ? <div className={cn()}>
              <div className={cn('text')}>
                Итого:
              </div>
              <div className={cn('sum')}>
                {countAndSum.sum.toLocaleString('ru-RU')} ₽
              </div>
            </div>
          : ''
      }
    </>
  )
}

Footer.propTypes = {
  countAndSum: propTypes.object,
}

Footer.defaultProps = {
  countAndSum: {},
}

export default React.memo(Footer);