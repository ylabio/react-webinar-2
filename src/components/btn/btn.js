import React from "react";
import { Link } from "react-router-dom";
import { cn as bem } from "@bem-react/classname";
import Spinner from "../spinner";
import "./style.css";

const Btn = ({
  title = "кнопка",
  name = ".......",
  setLogin = () => {},
  setDelete = () => {},
}) => {
  const cn = bem("Btn");

  return (
    <div className={cn()}>
      <Link to="/profile">
        <h6>{name}</h6>
      </Link>
      <button
        onClick={(e) => {
          setLogin();
          e.preventDefault();
          setDelete(localStorage.getItem("token"));
        }}
      >
        {title}
      </button>
    </div>
  );
};

export default Btn;
