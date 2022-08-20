import React, { useCallback } from "react";
import LayoutFlex from "../layout-flex";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { Link } from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";

const Header = () => {
  const cn = bem("Header");

  const user = useSelector((state) => state.user);
  const { t } = useTranslate();

  const store = useStore();

  const callbacks = {
    exit: useCallback(() => {
      store.get("user").exit();
    }, []),
  };

  React.useEffect(() => {
    store.get("user").getUser();
  }, []);

  console.log(t("login").signIn);

  return (
    <header>
      <LayoutFlex flex="end" padding="10">
        <Link
          //  onClick={callbacks.getProfile}
          to="/profile"
          className={cn("profile")}
        >
          <div>{user.name}</div>
        </Link>

        {user.name ? (
          <Link onClick={callbacks.exit} to="/">
            <button>{t("login").exit}</button>
          </Link>
        ) : (
          <Link to="/login">
            <button>{t("login").signIn}</button>
          </Link>
        )}
      </LayoutFlex>
    </header>
  );
};

export default React.memo(Header);
