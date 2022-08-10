import React, {useCallback} from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from "prop-types";

function Footer({showSum}){
  const cn = bem('Footer');

  const cb = {
    showSum: useCallback(() => {
      return showSum().sum;
    }, []),
    showCount: useCallback(() => {
      return showSum().count;
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
  showSum: propTypes.func.isRequired,
}

Footer.defaultProps = {
  showSum: () => {},
}

export default React.memo(Footer);