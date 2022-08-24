import React from 'react';
import { Navigate } from 'react-router-dom';
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";

import LayoutPage from '../../layouts/layout-page';
import LayoutFlex from '../../layouts/layout-flex';
import Tools from '../../containers/tools';
import UserPreview from '../../containers/user-preview';
import LocaleSelect from "../../containers/locale-select";
import Spinner from '../../components/spinner';
import ProfileInfo from '../../components/profile-info';

const Profile = () => {
  const {t} = useTranslate();

  const select = useSelector(state => ({
    checking: state.profile.checking,
    logged: state.profile.logged,
    info: state.profile.info,
  }));

  // если информация о пользователе уже не загружается
  // и пользователь не восстановлен, скидывает в логин
  //
  return !select.checking && !select.logged
    ? <Navigate to='/login' />
    : (
      <LayoutPage head={<>
        <UserPreview />
        <LayoutFlex place='row-between'>
          <h1>{t('title')}</h1>
          <LocaleSelect />
        </LayoutFlex>
      </>}>
        <Tools />
        <Spinner active={select.checking}>
          <ProfileInfo info={select.info} />
        </Spinner>
      </LayoutPage>
    )
}

export default React.memo(Profile);