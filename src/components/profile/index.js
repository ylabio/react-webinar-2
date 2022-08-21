import React from "react";

import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../layout/index";
import LocaleSelect from "../../containers/locale-select";
import Header from "../../components/header";
import LayoutProfile from "../layout-profile";

import useTranslate from "../../hooks/use-translate";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";

const Profile = () => {
  const { t } = useTranslate();

  const cn = bem("Profile");

  const store = useStore();

  const select = useSelector((state) => ({
    user: state.user,
  }));

  React.useEffect(() => {
    store.get("user").getUser();
  }, []);

  return (
    <Layout
      header={<Header />}
      head={
        <LayoutFlex flex="between" padding="20">
          <h1>{t("title")}</h1>
          <LocaleSelect />
        </LayoutFlex>
      }
    >
      <Tools />

      <LayoutProfile head={<h2>Профиль</h2>}>
        <div className={cn()}>
          <div className={cn("name")}>
            {t("profile").name}: <b> {select.user.name}</b>
          </div>
          <div className={cn("phone")}>
            {t("profile").phone}: <b> {select.user.phone}</b>
          </div>
          <div className={cn("email")}>
            email: <b> {select.user.email}</b>
          </div>
        </div>
      </LayoutProfile>
    </Layout>
  );
};

export default React.memo(Profile);
