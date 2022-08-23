import React, { useCallback, useEffect } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import useInit from '../../hooks/use-init';
import useTranslate from '../../hooks/use-translate';
import Layout from '../../components/layout';
import HeaderContainer from '../../containers/header-container';
import ProfileView from '../../components/profile-view';
import Tools from '../../containers/tools';
import Spinner from '../../components/spinner';

function Profile() {
  const store = useStore();
  const params = useParams();
  const { t } = useTranslate();

  useInit(async () => {
    await store.get('profile').getProfile(params.id);
  }, [params.id]);

  const select = useSelector((state) => ({
    name: state.profile.data.name,
    phone: state.profile.data.phone,
    email: state.profile.data.email,
    waiting: state.profile.waiting,
    isAuth: state.auth.isAuth,
    profileError: state.profile.error,
  }));

  console.log(select);

  if (!select.isAuth || select.profileError) {
    return <Navigate to={'/login'} />;
  }
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
