import React from 'react';
import useSelector from "../../hooks/use-selector";
import UserInfo from "../../components/user-info";
import Spinner from "../../components/spinner";

const ProfileContainer = () => {
  const select = useSelector(state => ({
    user: state.profile.user,
    waiting: state.profile.waiting
  }));

  return (
    <Spinner active={select.waiting}>
      <UserInfo user={select.user}/>
    </Spinner>
  );
};

export default React.memo(ProfileContainer);