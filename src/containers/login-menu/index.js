import { memo, useCallback } from "react";
import { Link } from "react-router-dom";
import React from "react";
import "./style.css";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";

function LoginMenu() {
  const { t } = useTranslate();
  const store = useStore();

  const select = useSelector((state) => ({
    username: state?.user?.user?.profile.name,
    waiting: state?.user.waiting,
  }));

  const callbacks = {
    onClick: useCallback(() => {
      store.get("user").logout();
    }, []),
  };

  return (
    <div className="LoginMenu">
      {select.username ? (
        <>
          <Link to="/profile" className="LoginMenu__user">
            {select.username}
          </Link>
          <button onClick={callbacks.onClick} className="LoginMenu__button">
            {t("logout")}
          </button>
        </>
      ) : (
        <>
          {select.waiting && <span>Загрузка...</span>}
          <Link to="/login" className="LoginMenu__button">
            {t("login")}
          </Link>
        </>
      )}
    </div>
  );
}

export default LoginMenu;
