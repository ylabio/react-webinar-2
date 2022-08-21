import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";

function Main() {
  const store = useStore();

  useInit(
    async () => {
      await store.get("catalog").initParams();
    },
    [],
    { backForward: true }
  );

  const { t } = useTranslate();

  const select = useSelector((state) => ({
    log: state.login.log,
  }));

  const callbacks = {
    // вход/выход
    setLogin: useCallback(
      () => store.get("login").setLogin(select.log),
      [select.log]
    ),
  };

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
      btn={
        select.log ? (
          <>
            <Link to="/profil">
              <button>ggg</button>
            </Link>
            {btn("выйте")}
          </>
        ) : (
          <Link to="/login">
            <button>Вход</button>
          </Link>
        )
      }
    >
      <Tools />
      <CatalogFilter />
      <CatalogList />
    </Layout>
  );
}

export default React.memo(Main);
