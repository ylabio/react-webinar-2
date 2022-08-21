import React from "react";
import useTranslate from "../../hooks/use-translate";
import LayoutPage from '../../layouts/layout-page';
import LayoutFlex from '../../layouts/layout-flex';
import Tools from '../../containers/tools';
import LocaleSelect from "../../containers/locale-select";
import UserPreview from '../../containers/user-preview';
import ErrorMessage from "../../components/error-message";

const NotFound = () => {
  const { t } = useTranslate();

  return (
    <LayoutPage head={<>
      <UserPreview />
      <LayoutFlex place='row-between'>
        <h1>{t('title')}</h1>
        <LocaleSelect />
      </LayoutFlex>
    </>}>
      <Tools />
      <ErrorMessage title='404' message='Страница не найдена' />
    </LayoutPage>
  )
};

export default NotFound;