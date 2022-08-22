import React from 'react';
import useSelector from "../../hooks/use-selector";
import UserInfo from "../../components/user-info";

const ProfileContainer = () => {
  const select = useSelector(state => ({user: state.profile.user}));

  return (
    <UserInfo user={select.user}/>
  );
};

export default React.memo(ProfileContainer);