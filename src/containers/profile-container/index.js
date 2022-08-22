import React, { useCallback, useState } from "react";
import Header from "../../components/header";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import { useNavigate } from "react-router-dom";
import Form from "../../components/form";
import useStore from "../../hooks/use-store";
import Profile from "../../components/profile";

function ProfileContainer() {
  //   const {lang, setLang, t} = useTranslate();
  const navigate = useNavigate();
  const store = useStore();


  const select = useSelector((state) => ({
    user: state.auth.user,
    isAuth: state.auth.isAuth,
  }));

  if (!select.isAuth) return navigate('/login')

  return (
    <Profile user={select.user} />
  );
}

export default React.memo(ProfileContainer);
