import React, { useEffect } from "react";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Data from "../../components/profile";

function Profile() {
  const {t} = useTranslate(); 

  const select = useSelector(state => ({
    name: state.user.name,
    phone: state.user.phone,
    email: state.user.email,
  }));

  return (
    <>
      {select.name && <Data name={select.name} phone={select.phone} email={select.email} t={t}/>}
    </>
  );
}

export default React.memo(Profile);
