import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Layout from "../../components/layout";
import LayoutFlex from "../../components/layout-flex";
import Tools from "../../containers/tools";
import Prof from "../../components/prof";
import Cabinet from "../../components/layout-cabinet";
import LocaleSelect from "../../containers/locale-select";

function Authorization({ btnExit }) {
  const store = useStore();
  let navigate = useNavigate();
  const { t } = useTranslate();

  const select = useSelector((state) => ({
    log: state.login.log,
    user: state.login.user,
  }));

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
      btn={btnExit}
    >
      <Tools />
      <Cabinet head={"Профиль"}>
        <Prof user={select.user} />
      </Cabinet>
    </Layout>
  );
}

export default React.memo(Authorization);
