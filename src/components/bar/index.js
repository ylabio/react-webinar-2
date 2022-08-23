import { cn as bem } from '@bem-react/classname';
import React from 'react'
import { Link } from 'react-router-dom';
import useTranslate from '../../hooks/use-translate';
import './style.css'
import propTypes from 'prop-types';


function Bar({ isAuth, callback, login }) {
  const { t } = useTranslate();
  const cn = bem('Bar');
  return (
    <div className={cn()}>
      {isAuth ?
        <>
          <Link className={cn('title')}
            to={'/profile'}
          >
            {login}
          </Link>
          <button className={cn("button")}
            onClick={callback}
          >
            {t('logout.button')}
          </button>
        </>
        :
        <Link className={cn("button")}
          to={'/login'}
        >
          {t("bar.button")}
        </Link>
      }
    </div>

  )
}

Bar.propTypes = {
  callback: propTypes.func.isRequired,
  login: propTypes.string,
}




export default Bar
