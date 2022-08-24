import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Layout from "../../components/layout";
import LayoutFlex from "../../components/layout-flex";
import Tools from "../../containers/tools";
import Form from "../../components/form";
import Cabinet from "../../components/layout-cabinet";
import LocaleSelect from "../../containers/locale-select";
import Spinner from "../../components/spinner";

function Authorization() {
  const store = useStore();
  let navigate = useNavigate();
  const { t } = useTranslate();

  const select = useSelector((state) => ({
    log: state.login.log,
    user: state.login.user,
    waiting: state.login.waiting,
  }));

  const [stateFetch, setStateFetch] = useState({ login: "", password: "" });

  console.log("waiting", select.waiting);

  const callbacks = {
    // вход/выход
    setLogin: useCallback(
      () => store.get("login").setLogin(false, stateFetch),
      [stateFetch]
    ),
  };

  useEffect(() => {
    if (select.log) {
      return navigate("/profile");
    }
  }, [select.log]);

  useEffect(() => {
    if (stateFetch.login) {
      callbacks.setLogin();
    }
  }, [stateFetch]);

  console.log("state", stateFetch);
  return (
    <Layout
      head={
        <LayoutFlex flex="between">
          <h1>{t("title")}</h1>
          <LocaleSelect />
        </LayoutFlex>
      }
      btn={
        <Link to="/login">
          <button>Вход</button>
        </Link>
      }
    >
      <Tools />
      <Spinner active={select.waiting}>
        <Cabinet head={"Вход"}>
          <Form setStateFetch={setStateFetch} user={select.user} />
        </Cabinet>
      </Spinner>
    </Layout>
  );
}

export default React.memo(Authorization);
