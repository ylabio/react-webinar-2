import React from "react";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Profile from "../../components/profile";
import Spinner from "../../components/spinner";

function ProfileContainer() {
  const { t } = useTranslate();

  const select = useSelector((state) => ({
    user: state.profile.user,
    waiting: state.profile.waiting,
  }));

  return (
    <Spinner active={select.waiting}>
      <Profile user={select.user} t={t} />
    </Spinner>
  );
}

export default React.memo(ProfileContainer);
