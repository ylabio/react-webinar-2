import React, { useEffect } from "react";
import Layout from "../../components/layout";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import LayoutFlex from "../../components/layout-flex";
import LocaleSelect from "../../containers/locale-select";
import UserInfo from "../../components/user-info";
import Tools from "../../containers/tools";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.is_token_valid);
  const user_data = useSelector((state) => ({
    username: state.profile.username,
    phone: state.profile.phone,
    email: state.profile.email,
  }));

  useEffect(() => {
    if (!isLoggedIn) navigate("/login", { replace: true });
  }, [isLoggedIn]);

  const { t } = useTranslate();

  return (
    <Layout
      head={
        <LayoutFlex flex="between">
          <h1>{t("title")}</h1>
          <LocaleSelect />
        </LayoutFlex>
      }
    >
      <Tools />
      <UserInfo info={user_data} />
    </Layout>
  );
}

export default Profile;
