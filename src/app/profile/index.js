import React, { useEffect } from "react";
import Layout from "../../components/layout";
import useInit from "../../hooks/use-init";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import LayoutFlex from "../../components/layout-flex";
import LocaleSelect from "../../containers/locale-select";
import UserInfo from "../../components/user-info";
import Tools from "../../containers/tools";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const store = useStore();
  const token = useSelector((state) => state.auth.token);
  let user_data = useSelector((state) => ({
    username: state.auth.username,
    phone: state.auth.extra_data.phone,
    email: state.auth.extra_data.email,
  }));

  useEffect(() => {
    if (!token) navigate("/login", { replace: true });
  }, [token]);

  useInit(async () => {
    await store.get("auth").getProfile();
  });

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
