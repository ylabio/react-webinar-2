import React, { useEffect } from "react";
import useSelector from "../../hooks/use-selector";
import { useNavigate } from "react-router-dom";
import useTranslate from "../../hooks/use-translate";
import Spinner from "../../components/spinner";
import Tools from "../../containers/tools";
import Layout from "../../components/layout";
import LayoutFlex from "../../components/layout-flex";
import LocaleSelect from "../../containers/locale-select";
import User from "../../containers/user";
import ProfileCard from "../../components/profile-card";

function Profile() {
  const { t } = useTranslate();
  const navigate = useNavigate();

  const select = useSelector((state) => ({
    token: state.user.token,
    waiting: state.user.waiting,
    user: state.user.data,
  }));

  useEffect(() => {
    // Редирект на страницу логина, если пользователь не авторизирован
    if (!select.token) {
      navigate("/login", { replace: true });
    }
  }, [select.token]);

  return (
    <Layout
      before={
        <LayoutFlex flex="end" padding={false}>
          <User />
        </LayoutFlex>
      }
      head={
        <LayoutFlex flex="between">
          <h1>{t("title")}</h1>
          <LocaleSelect />
        </LayoutFlex>
      }
    >
      <Tools />
      <Spinner active={select.waiting}>
        <ProfileCard user={select.user} t={t} />
      </Spinner>
    </Layout>
  );
}

export default React.memo(Profile);
