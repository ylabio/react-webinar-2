import React, { useCallback } from "react";
import LocaleSelect from "../locale-select";
import useTranslate from "../../hooks/use-translate";
import Auth from "../../components/auth";
import LayoutFlex from "../../components/layout-flex";
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";
import useStore from "../../hooks/use-store";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Header({ title }) {
  const store = useStore();
  const select = useSelector((state) => ({ loggedIn: state.user.loggedIn, name: state.user.name }));
  const cn = bem("Header");

  useInit(
    async () => {
      const token = localStorage.getItem("ylabToken");
      if (token) {
        await store.get("user").authentication(token);
      }
    },
    [],
    { backForward: true }
  );

  const { t } = useTranslate();

  title = title || t("title");

  const callbacks = {
    onLogOut: useCallback(() => store.get("user").logOut(), []),
  };

  return (
    <header className={cn()}>
      <Auth loggedIn={select.loggedIn} name={select.name} onLogOut={callbacks.onLogOut} />
      <LayoutFlex flex="between">
        <h1>{title}</h1>
        <LocaleSelect />
      </LayoutFlex>
    </header>
  );
}

export default React.memo(Header);
