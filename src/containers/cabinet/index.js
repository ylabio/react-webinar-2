import React, {useCallback} from "react";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Tools from "../tools";
import Spinner from "../../components/spinner";
import UserProfile from "../../components/user-profile";

function Cabinet() {

  const store = useStore();

  const select = useSelector(state => ({
    items: state.catalog.items,
    page: state.catalog.params.page,
    limit: state.catalog.params.limit,
    count: state.catalog.count,
    waiting: state.catalog.waiting,
    dataUser: state.authorization.dataUser,
  }));

  let user = '';
  if (select.dataUser?.profile?.name)
    user = select.dataUser.profile.name; 

  const {t} = useTranslate();

  return (
    <Spinner active={select.waiting}>
      <Tools/>
      <UserProfile h2={t('cabinet.h2')} 
                   name={t('cabinet.name')} 
                   phone={t('cabinet.phone')}
                   email={t('cabinet.email')}
                   user={user}
                   dataUser={select.dataUser}
                   profileUrl={'/login'}/>
    </Spinner>
  );
}

export default React.memo(Cabinet);