import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import Spinner from "../../components/spinner";
import Tools from "../../containers/tools";
import Layout from "../../components/layout";
import LayoutFlex from "../../components/layout-flex";
import LocaleSelect from "../../containers/locale-select";
import UserInfo from "../../components/user-info";
import TopMenu from "../../containers/top-menu";

function Profile() {
  const select = useSelector((state) => ({
    user: state.auth.user,
    waiting: state.auth.waiting,
  }));

  const { t } = useTranslate();

  if (!select.user) {
    return <Navigate replace to="/login" />;
  }

  return (
    <>
      <TopMenu />
      <Layout
        head={
          <LayoutFlex flex="between">
            <h1>{t("title")}</h1>
            <LocaleSelect />
          </LayoutFlex>
        }
      >
        <Tools />

        <Spinner active={select.waiting}>
          <UserInfo user={select.user} t={t} />
        </Spinner>
      </Layout>
    </>
  );
}

export default React.memo(Profile);
