import React from "react";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Profile from "../../components/profile";

function ProfileContainer() {
  const { t } = useTranslate();

  const select = useSelector((state) => ({
    user: state.auth.user,
  }));

  return (
    <Profile user={select.user} t={t} />
  );
}

export default React.memo(ProfileContainer);
