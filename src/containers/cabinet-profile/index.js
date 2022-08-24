import React from "react";

import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";

import Tools from "../tools";

import Spinner from "../../components/spinner";
import UserProfile from "../../components/user-profile";

function CabinetProfile() {

  const select = useSelector(state => ({
    dataUser: state.userinfo.dataUser,
    waiting: state.userinfo.waiting
  }));

  const {t} = useTranslate();

  return (
    <Spinner active={select.waiting}>
      <Tools/>
      {!select.waiting && <UserProfile h2={t('cabinet.h2')} 
                   name={t('cabinet.name')} 
                   phone={t('cabinet.phone')}
                   email={t('cabinet.email')}
                   dataUser={select.dataUser}/>}
    </Spinner>
  );
}

export default React.memo(CabinetProfile);