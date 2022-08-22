import React from "react";
import { Link } from "react-router-dom";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

const Btn = ({
  title = "кнопка",
  log,
  name = "test",
  setLogin = () => {},
  setDelete = () => {},
}) => {
  const cn = bem("Btn");

  return (
    <div className={cn()}>
      <Link to="/profil">
        <h6>{name}</h6>
      </Link>
      <button
        onClick={(e) => {
          setLogin();
          e.preventDefault();
          {
            log && setDelete(localStorage.getItem("token"));
          }
        }}
      >
        {title}
      </button>
    </div>
  );
};

export default Btn;
