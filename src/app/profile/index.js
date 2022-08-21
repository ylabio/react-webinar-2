import React from 'react';
import CommonLayout from '../../containers/common-layout';
import useSelector from '../../hooks/use-selector';
import { Navigate } from 'react-router-dom';
import UserInfo from '../../components/items/user-info';
import useTranslate from '../../hooks/use-translate';
import Stack from '../../components/elements/stack';

const Profile = () => {
  const { status, profile, waiting } = useSelector((s) => s.user);
  const { t } = useTranslate();
  if (status !== 'confirm' && !profile.name) return <Navigate to="/sign_in" />;

  return (
    <CommonLayout>
      <Stack spacing={'normal'} px={'normal'}>
        {waiting ? <div>loading...</div> : <UserInfo user={profile} t={t} />}
      </Stack>
    </CommonLayout>
  );
};

export default Profile;
