import React from 'react';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import Layout from '../../components/layout';
import HeaderContainer from '../../containers/header-container';
import ProfileView from '../../components/profile-view';
import Tools from '../../containers/tools';
import Spinner from '../../components/spinner';

function Profile() {
  const { t } = useTranslate();

  const select = useSelector((state) => ({
    name: state.profile.data.name,
    phone: state.profile.data.phone,
    email: state.profile.data.email,
    waiting: state.auth.waiting,
  }));

  return (
    <Layout head={<HeaderContainer />}>
      <Tools />
      <Spinner active={select.waiting}>
        <ProfileView name={select.name} phone={select.phone} email={select.email} t={t} />
      </Spinner>
    </Layout>
  );
}

export default React.memo(Profile);
