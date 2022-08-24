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
import Spinner from "../../components/spinner";

function Profile() {
  const store = useStore();
  const navigate = useNavigate();

  useInit(async () => {
    if (localStorage.getItem("token")) {
      await store.get("profile").getProfile(localStorage.getItem("token"));
    } else {
      navigate("/login", { replace: true });
    }
  }, []);

  const select = useSelector((state) => ({
    user: state.profile.user,
    isAuth: state.login.isAuth,
    token: state.login.token,
    isLoading: state.profile.isLoading,
  }));

  useEffect(() => {
    if (!select.token) {
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
      <Spinner active={select.isLoading}>
        {Object.keys(select.user).length !== 0 && select.isAuth && (
          <ProfileLayout user={select.user} t={t} />
        )}
      </Spinner>
    </Layout>
  );
}

export default React.memo(Profile);
