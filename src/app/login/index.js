import React from "react";

import useTranslate from "../../hooks/use-translate";

import PageLayout from "../../components/layouts/page-layout";
import LoginForm from "../../containers/login-form";

function Login() {
  const { t } = useTranslate();

  return (
    <PageLayout title={t("title")}>
      <LoginForm />
    </PageLayout>
  );
}

export default React.memo(Login);
