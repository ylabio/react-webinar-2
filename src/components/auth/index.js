import React from "react";
import { Link } from "react-router-dom";
import useTranslate from "../../hooks/use-translate";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import LayoutFlex from "../layout-flex";

function Auth({ loggedIn, name, onLogOut }) {
  const cn = bem("Auth");
  const { t } = useTranslate();
  return (
    <div className={cn()}>
      {loggedIn ? (
        <LayoutFlex flex="end" padding={false}>
          <Link to="/profile" className={cn("user")}>
            {name}
          </Link>
          <button onClick={onLogOut}>{t("user.signOut")}</button>
        </LayoutFlex>
      ) : (
        <Link to="/login">
          <button>{t("user.signIn")}</button>
        </Link>
      )}
    </div>
  );
}

export default React.memo(Auth);
