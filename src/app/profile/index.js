import React from 'react';
import {useNavigate} from 'react-router-dom';
import Spinner from '../../components/common/spinner';
import Layout from '../../components/layouts/layout';
import ProfileContent from '../../components/profile/profile-content';
import CommonHead from '../../containers/common-head';
import CommonTopbar from '../../containers/common-topbar';
import Tools from '../../containers/tools';
import {useNotSignedEffect} from '../../hooks/use-not-signed-effect';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';

function Profile() {
  const select = useSelector(state => ({
    isSigned: state.session.isSigned,
    isFetching: state.session.isFetching,
    profile: state.profile
  }));

  const navigate = useNavigate();
  const {t} = useTranslate();
  useNotSignedEffect(() => {
    navigate('/login', {state: {redirect: 'profile'}, replace: true});
  });

  return (
    <Layout head={<CommonHead />} topbar={<CommonTopbar />}>
      <Tools />
      <Spinner active={select.isFetching}>
        <ProfileContent
          profile={select.profile}
          text={{
            head: t('profile.head'),
            name: t('profile.name'),
            email: t('profile.email'),
            phone: t('profile.phone')
          }}
        />
      </Spinner>
    </Layout>
  );
}

export default React.memo(Profile);
