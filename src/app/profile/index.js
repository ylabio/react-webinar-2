import React from "react";
import useSelector from "../../hooks/use-selector";
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
  }));
  const { t } = useTranslate();

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
        <UserInfo user={select.user} t={t} />
      </Layout>
    </>
  );
}

export default React.memo(Profile);
