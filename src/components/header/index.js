import React from 'react';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import './styles.css';
import LocaleSelect from '../../containers/locale-select';
import LayoutFlex from '../layout-flex';

function Header({ title, loginOrLogout }) {
  const cn = bem('Header');

  return (
    <div className={cn()}>
      <div className={cn('top')}>
        <LayoutFlex flex="end" padding={false}>
          {loginOrLogout()}
        </LayoutFlex>
      </div>
      <div className={cn('bottom')}>
        <LayoutFlex flex="between">
          <h1>{title}</h1>
          <LocaleSelect />
        </LayoutFlex>
      </div>
    </div>
  );
}

Header.propTypes = {
  title: propTypes.string,
  loginOrLogout: propTypes.func.isRequired,
};

Header.defaultProps = {
  title: 'title',
};

export default React.memo(Header);
