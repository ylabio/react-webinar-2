import React from 'react';
import { cn as bem } from "@bem-react/classname";
import propTypes from 'prop-types';
import './style.css';
import LayoutLink from '../wrappers/layout-link';
import { Link } from 'react-router-dom';
import useTranslate from '../../hooks/use-translate';


function ProfileHead(props) {
  const cn = bem('ProfileHead');

  const { t } = useTranslate();

  return (
    <div className={cn()}>
      <Link className={cn('name')} to='/profile'>{props.name}</Link>
      <LayoutLink>
        <a onClick={() => props.logout()}>{t('auth.logout')}</a>
      </LayoutLink>
    </div>
  )
}

ProfileHead.propTypes = {
  name: propTypes.string,
  logout: propTypes.func,
}

ProfileHead.defaultProps = {
  name: '',
  logout: () => { },
}


export default React.memo(ProfileHead)