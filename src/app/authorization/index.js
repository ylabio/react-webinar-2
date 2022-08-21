import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Layout from "../../components/layout";
import LayoutFlex from "../../components/layout-flex";
import Tools from "../../containers/tools";
import Form from "../../components/form";
import LocaleSelect from "../../containers/locale-select";

function Authorization() {
  const store = useStore();

  const { t } = useTranslate();

  const select = useSelector((state) => ({
    log: state.login.log,
  }));

  const callbacks = {
    // вход
    setLogin: useCallback(() => store.get("login").setLogin(), []),
  };

  return (
    <Layout
      head={
        <LayoutFlex flex="between">
          <h1>{t("title")}</h1>
          <LocaleSelect />
        </LayoutFlex>
      }
      authorization={
        <Link to="/login">
          <button>Вход</button>
        </Link>
      }
    >
      <Tools />
      <Form log={select.log} setLogin={callbacks.setLogin} />
    </Layout>
  );
}

export default React.memo(Authorization);
