import React from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import Tools from "../../containers/tools";
import Layout from "../../components/layouts/layout";
import LayoutFlex from "../../components/layouts/layout-flex";
import LocaleSelect from "../../containers/locale-select";
import TopMenu from "../../containers/top-menu";
import UserProfile from "../../containers/userProfile";

function Profile() {
  const store = useStore();

  const select = useSelector((state) => ({
    user: state.auth.user,
    waiting: state.auth.waiting,
  }));

  const { t } = useTranslate();
  useInit(
    async () => {
      await store.get("auth").getUser();
    },
    [select.user],
    { backForward: true }
  );

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
        <UserProfile />
      </Layout>
    </>
  );
}

export default React.memo(Profile);
