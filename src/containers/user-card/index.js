import React, { memo } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function UserCard({ user, title }) {
  const cn = bem("UserCard");

  if (!user) return null;

  return (
    <div className={cn()}>
      <h2 className={cn("title")}>{title}</h2>
      <div className={cn("fields")}>
        Имя: <strong>{user.profile.name}</strong>
      </div>
      <div className={cn("fields")}>
        Телефон: <strong>{user.profile.phone}</strong>
      </div>
      <div className={cn("fields")}>
        email: <strong>{user.email}</strong>
      </div>
    </div>
  );
}

UserCard.propTypes = {
  user: propTypes.object,
};

UserCard.defaultProps = {
  user: null,
};

export default memo(UserCard);
