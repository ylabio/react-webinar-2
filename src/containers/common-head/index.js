import React from 'react';
import LayoutFlex from '../../components/layouts/layout-flex';
import useTranslate from '../../hooks/use-translate';
import LocaleSelect from '../locale-select';

function CommonHead() {
  const {t} = useTranslate();

  return (
    <LayoutFlex flex='between'>
      <h1>{t('title')}</h1>
      <LocaleSelect />
    </LayoutFlex>
  );
}

export default React.memo(CommonHead);
