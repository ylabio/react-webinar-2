import React, { useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Layout from "../../components/layout";
import LayoutFlex from "../../components/layout-flex";
import Tools from "../../containers/tools";
import Form from "../../components/form";
import Prof from "../../components/prof";
import Cabinet from "../../components/layout-cabinet";
import LocaleSelect from "../../containers/locale-select";

function Authorization() {
  const store = useStore();
  let navigate = useNavigate();
  const { t } = useTranslate();

  const select = useSelector((state) => ({
    log: state.login.log,
  }));

  console.log("log", select.log);

  const callbacks = {
    // вход/выход
    setLogin: useCallback(
      () => store.get("login").setLogin(!select.log),
      [select.log]
    ),
  };

  useEffect(() => {
    if (!select.log) {
      return navigate("/");
    }
  }, [select.log]);

  const btn = (title) => {
    return (
      <button
        onClick={(e) => {
          callbacks.setLogin();
          e.preventDefault();
        }}
      >
        {title}
      </button>
    );
  };

  return (
    <Layout
      head={
        <LayoutFlex flex="between">
          <h1>{t("title")}</h1>
          <LocaleSelect />
        </LayoutFlex>
      }
      btn={<Link to="/">{btn("выйте")}</Link>}
    >
      <Tools />
      <Cabinet head={"Вход"}>
        <Prof />
      </Cabinet>
    </Layout>
  );
}

export default React.memo(Authorization);
