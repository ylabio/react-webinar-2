import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function ProfileInfo({user}) {
  const cn = bem("ProfileInfo");

  return (
    <div className={cn()}>
      <h2 className={cn("title")}>Профиль</h2>
      <p className={cn("text")}>
        <span className={cn("name")}>Имя: </span>
        <b className={cn("value")}>{user.profile.name}</b>
      </p>
      <p className={cn("text")}>
        <span className={cn("name")}>Телефон: </span>
        <b className={cn("value")}>{user.profile.phone}</b>
      </p>
      <p className={cn("text")}>
        <span className={cn("name")}>email: </span>
        <b className={cn("value")}>{user.email}</b>
      </p>
    </div>
  );
}

ProfileInfo.propTypes = {
  user: propTypes.object,
};
ProfileInfo.defaultProps = {
  user: {},
};

export default React.memo(ProfileInfo);
