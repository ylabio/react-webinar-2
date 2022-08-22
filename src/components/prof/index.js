import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Prof({ user }) {
  console.log(user);

  const cn = bem("Prof");

  return (
    <ul className={cn()}>
      <li>
        Имя: <span>{user.profile.name}</span>
      </li>
      <li>
        Телефон: <span>{user.profile.phone}</span>
      </li>
      <li>
        email: <span>{user.email}</span>
      </li>
    </ul>
  );
}

export default React.memo(Prof);
