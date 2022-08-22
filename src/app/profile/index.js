import React, { useCallback, useEffect } from "react";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-components/layout-flex";
import Layout from "../../components/layout-components/layout";
import LocaleSelect from "../../containers/locale-select";
import useSelector from "../../hooks/use-selector";
import ProfileLayout from "../../components/profile-layout";
import LoginBoard from "../../containers/login-board";
import { useNavigate } from "react-router-dom";
import useInit from "../../hooks/use-init";

function Profile() {
  const store = useStore();
  const navigate = useNavigate();

  useInit(
    async () => {
      if (localStorage.getItem("token")) {
        await store.get("login").authCheck();
      }
    },
    [],
    { backForward: true }
  );

  const select = useSelector((state) => ({
    user: state.login.user,
    isAuth: state.login.isAuth,
    isLoading: state.login.isLoading,
  }));

  useEffect(() => {
    if (!select.isAuth) {
      navigate("/login", { replace: true });
    }
  }, [select.isAuth]);

  const { t } = useTranslate();

  return (
    <Layout
      preHead={<LoginBoard />}
      head={
        <LayoutFlex flex="between">
          <h1>{t("title")}</h1>
          <LocaleSelect />
        </LayoutFlex>
      }
    >
      <Tools />
      {select.isAuth && <ProfileLayout user={select.user} t={t} />}
    </Layout>
  );
}

export default React.memo(Profile);
