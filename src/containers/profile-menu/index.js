import React, {useCallback} from "react";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import ProfileSimple from "../../components/profile-simple";
import useStore from "../../hooks/use-store";

function ProfileMenu() {
  const store = useStore();
  const {t} = useTranslate();

  const select = useSelector(state => ({
    authorisedUser: state.authorisation.authorisedUser,
  }));

  const callbacks = {
    onLogoutClick: useCallback(() => store.get('authorisation').logout(), []),
  };

  return (
    <ProfileSimple profileLink={'/profile'}
                   loginLink={'/login'}
                   linkText={select.authorisedUser}
                   buttonText={select.authorisedUser ? t('profile.logout') : t('profile.login')}
                   authorisedUser={select.authorisedUser}
                   onClick={select.authorisedUser ? callbacks.onLogoutClick : () => {}} />
  );
}

export default React.memo(ProfileMenu);
