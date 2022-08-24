import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function ProfileLayout({ user, t }) {
  const cn = bem("ProfileLayout");

  return (
    <div className={cn()}>
      <span className={cn("head")}>{t("profile.title")}</span>
      <span className={cn("content")}>
        {t("profile.name")}: <strong>{user.profile.name}</strong>
      </span>
      <span className={cn("content")}>
        {t("profile.phone")}: <strong>{user.profile.phone}</strong>
      </span>
      <span className={cn("content")}>
        email: <strong>{user.email}</strong>
      </span>
    </div>
  );
}

ProfileLayout.propTypes = {
  user: propTypes.object.isRequired,
  t: propTypes.func.isRequired,
};

ProfileLayout.defaultProps = {};

export default React.memo(ProfileLayout);
