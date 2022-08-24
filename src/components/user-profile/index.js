import React from "react";
import useTranslate from "../../hooks/use-translate";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function UserProfile({ userData }) {
  const cn = bem("UserProfile");
  const { t } = useTranslate();

  return (
    <div className={cn()}>
      <h2>{t("user.profile")}</h2>
      <p>
        {t("user.name")}: <strong>{userData.name}</strong>
      </p>
      <p>
        {t("user.phone")}: <strong>{userData.phone}</strong>
      </p>
      <p>
        {t("user.email")}: <strong>{userData.email}</strong>
      </p>
    </div>
  );
}

export default React.memo(UserProfile);
