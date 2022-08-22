import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/layouts/page-layout";
import UserCard from "../../containers/user-card";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";

function Profile() {
  const { t } = useTranslate();
  const navigate = useNavigate();

  const select = useSelector((state) => ({
    user: state.user.user,
  }));

  useEffect(() => {
    if (!select.user) navigate("/login");
  }, [select.user]);

  return (
    <PageLayout title={t("title")}>
      <UserCard user={select?.user} title={t("profile")} />
    </PageLayout>
  );
}

export default React.memo(Profile);
