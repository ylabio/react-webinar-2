import React, { useCallback, useState } from "react";
import { Navigate } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Spinner from "../../components/spinner";
import Tools from "../../containers/tools";
import Layout from "../../components/layout";
import LayoutFlex from "../../components/layout-flex";
import LocaleSelect from "../../containers/locale-select";
import User from "../../components/user";

function UserMenu() {
  const store = useStore();

  const user = store.get("user").store.state.user.user;

  const { t } = useTranslate();

  const select = useSelector((state) => ({
    waiting: state.article.waiting,
  }));

  return (
    <>
      {Object.keys(user).length === 0 ? (
        <Navigate replace to="/login" />
      ) : (
        <Layout
          head={
            <LayoutFlex flex="between">
              <h1>{t("title")}</h1>
              <LocaleSelect />
            </LayoutFlex>
          }
        >
          <Tools />
          <Spinner active={select.waiting}>
            <User user={user} />
          </Spinner>
        </Layout>
      )}
    </>
  );
}

export default React.memo(UserMenu);
