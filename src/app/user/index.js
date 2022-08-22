import React, { useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Layout from "../../components/layout";
import LayoutFlex from "../../components/layout-flex";
import Tools from "../../containers/tools";
import Prof from "../../components/prof";
import Cabinet from "../../components/layout-cabinet";
import LocaleSelect from "../../containers/locale-select";
import Btn from "../../components/btn/btn";

function Authorization() {
  const store = useStore();
  let navigate = useNavigate();
  const { t } = useTranslate();

  const select = useSelector((state) => ({
    log: state.login.log,
    user: state.login.user,
  }));

  console.log("log", select.log);

  const callbacks = {
    // вход/выход
    setLogin: useCallback(
      () => store.get("login").setLogin(select.log),
      [select.log]
    ),
    setDelete: useCallback((token) => store.get("login").setDelete(token), []),
  };

  useEffect(() => {
    if (!select.log) {
      return navigate("/");
    }
  }, [select.log]);

  return (
    <Layout
      head={
        <LayoutFlex flex="between">
          <h1>{t("title")}</h1>
          <LocaleSelect />
        </LayoutFlex>
      }
      btn={
        <Btn
          title="Выйте"
          log={select.log}
          name={select.user.name}
          setLogin={callbacks.setLogin}
          setDelete={callbacks.setDelete}
        />
      }
    >
      <Tools />
      <Cabinet head={"Профиль"}>
        <Prof user={select.user} />
      </Cabinet>
    </Layout>
  );
}

export default React.memo(Authorization);
