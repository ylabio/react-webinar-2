import React from 'react';
import {useTranslation} from 'react-i18next';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Nav({onClick}) {
  const cn = bem('Nav');
  const { t } = useTranslation();

  return (
    <div className={cn()}>
      <span className={cn('link-to-main')} onClick={onClick}>{t('NavBackToMain')}</span>
    </div>
  )
}

Nav.propTypes = {
  onClick: propTypes.func.isRequired
}

export default React.memo(Nav);