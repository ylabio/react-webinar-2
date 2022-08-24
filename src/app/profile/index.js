import React from 'react';
import CommonLayout from '../../containers/common-layout';
import useSelector from '../../hooks/use-selector';
import UserInfo from '../../components/items/user-info';
import useTranslate from '../../hooks/use-translate';
import Stack from '../../components/elements/stack';

const Profile = () => {
  const {profile} = useSelector((s) => s.user);
  const {t} = useTranslate();

  return (
    <CommonLayout>
      <Stack spacing={'normal'} px={'normal'}>
        <UserInfo user={profile} t={t}/>
      </Stack>
    </CommonLayout>
  );
};

export default Profile;
