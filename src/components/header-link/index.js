import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { cn as bem } from "@bem-react/classname";
import useStore from "../../hooks/use-store";
import "./style.css";

function HeaderLink() {
  const cn = bem("HeaderLink");
  const store = useStore();
  const navigate = useNavigate();

  const userStore = store.get("user");
  const user = userStore.store.state.user;

  function exit() {
    userStore
      .cancelAuthorize(user.token)
      .then((res) => {
        if (res.result) {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const link = () => {
    if (user.isLogged) {
      return (
        <button className={cn("link")} onClick={exit}>
          Выход
        </button>
      );
    } else {
      return (
        <Link to="/login">
          <button className={cn("link")}>Вход</button>
        </Link>
      );
    }
  };

  return (
    <header className={cn()}>
      <div className={cn("wrapper")}>
        <Link to="/user" className={cn("mail")}>
          {user.user.email}
        </Link>
        {link()}
      </div>
    </header>
  );
}

export default React.memo(HeaderLink);
