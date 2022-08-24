import React from "react";
import { cn as bem } from "@bem-react/classname";
import propTypes from "prop-types";
import "./style.css";

function ProfileCard({ user, t }) {
  const cn = bem("ProfileCard");
  return (
    <div className={cn()}>
      <h2>{t("profile")}</h2>
      <div className={cn("prop")}>
        <div className={cn("label")}>{t("profile.name")}:</div>
        <div className={cn("value")}>{user.profile?.name}</div>
      </div>
      <div className={cn("prop")}>
        <div className={cn("label")}>{t("profile.phone")}:</div>
        <div className={cn("value")}>{user.profile?.phone}</div>
      </div>
      <div className={cn("prop")}>
        <div className={cn("label")}>email:</div>
        <div className={cn("value")}>{user.email}</div>
      </div>
    </div>
  );
}

ProfileCard.propTypes = {
  user: propTypes.object.isRequired,
  t: propTypes.func,
};

ProfileCard.defaultProps = {
  t: (text) => text,
};

export default React.memo(ProfileCard);
