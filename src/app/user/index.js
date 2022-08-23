import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Layout from "../../components/layout";
import LayoutFlex from "../../components/layout-flex";
import Tools from "../../containers/tools";
import Prof from "../../components/prof";
import Cabinet from "../../components/layout-cabinet";
import LocaleSelect from "../../containers/locale-select";

function Authorization({ btnExit }) {
  let navigate = useNavigate();
  const { t } = useTranslate();

  const select = useSelector((state) => ({
    log: state.login.log,
    user: state.login.user,
  }));
  const page = useLocation();
  console.log(page);

  useEffect(() => {
    if (!select.log && !select.user.load) {
      return navigate("/login");
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
