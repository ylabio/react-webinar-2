import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import "./style.css";

function UserInfo({}) {
  // CSS классы по БЭМ
  const cn = bem("LoginForm");

  return <div className={cn()}>Профиль имя телефон адрес</div>;
}

export default React.memo(UserInfo);
