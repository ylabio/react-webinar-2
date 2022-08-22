import React from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import Tools from '../../containers/tools';
import LayoutFlex from '../../components/layout-flex';
import Layout from '../../components/layout';
import LocaleSelect from '../../containers/locale-select';
import ProfileInfo from '../../components/profileInfo';
import { useNavigate } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';

function Profile() {
  const store = useStore();
  const { t } = useTranslate();

  const navigate = useNavigate();
  const select = useSelector((state) => ({
    user: state.auth.user,
    token: state.auth,
  }));

  React.useEffect(() => {
    select.user == undefined ? navigate('../login') : '';
  });

  return (
    <Layout
      head={
        <LayoutFlex flex='between'>
          <h1>{t('title')}</h1>
          <LocaleSelect />
        </LayoutFlex>
      }>
      <Tools />
      {select.user == undefined ? '' : <ProfileInfo user={select.user} />}
    </Layout>
  );
}

export default React.memo(Profile);
