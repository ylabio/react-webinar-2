import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Layout from '../../components/layouts/layout';
import ProfileContent from '../../components/profile/profile-content';
import CommonHead from '../../containers/common-head';
import CommonTopbar from '../../containers/common-topbar';
import Tools from '../../containers/tools';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';

function Profile() {
  const select = useSelector(state => ({
    isSigned: state.auth.isSigned,
    profile: state.profile
  }));

  const navigate = useNavigate();
  const {t} = useTranslate();

  useEffect(() => {
    if (!select.isSigned) {
      navigate('/login/profile');
    }
  }, [select.isSigned]);

  return (
    <Layout head={<CommonHead />} topbar={<CommonTopbar />}>
      <Tools />
      <ProfileContent
        profile={select.profile}
        text={{
          head: t('profile.head'),
          name: t('profile.name'),
          email: t('profile.email'),
          phone: t('profile.phone')
        }}
      />
    </Layout>
  );
}

export default React.memo(Profile);
