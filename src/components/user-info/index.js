import React from "react";
import "./style.css";
import { cn as bem } from "@bem-react/classname";

function UserInfo({ info }) {
  const cn = bem("UserInfo");

  return (
    <div className={cn()}>
      <h2>Профиль</h2>
      <span>
        Имя: <b>{info.username}</b>
      </span>
      <span>
        Телефон: <b>{info.phone}</b>
      </span>
      <span>
        email: <b>{info.email}</b>
      </span>
    </div>
  );
}

export default UserInfo;
