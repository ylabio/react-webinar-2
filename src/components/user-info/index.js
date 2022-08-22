import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function UserInfo({ user, t }) {
  // CSS классы по БЭМ
  const cn = bem("UserInfo");

  return (
    <div className={cn()}>
      <h2>{t("userInfo.title")}</h2>
      <div className={cn("prop")}>
        <div className={cn("label")}>{t("userInfo.name")}:</div>
        <div className={cn("value")}>{user.username}</div>
      </div>
      <div className={cn("prop")}>
        <div className={cn("label")}>{t("userInfo.phone")}:</div>
        <div className={cn("value")}>{user.profile?.phone}</div>
      </div>
      <div className={cn("prop")}>
        <div className={cn("label")}>email:</div>
        <div className={cn("value")}>{user.email}</div>
      </div>
    </div>
  );
}
UserInfo.propTypes = {
  user: propTypes.object.isRequired,
  t: propTypes.func,
};

UserInfo.defaultProps = {
  user: {},
  t: (text) => text,
};

export default React.memo(UserInfo);
