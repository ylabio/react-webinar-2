import React from "react";
import { cn as bem } from "@bem-react/classname";
import propTypes from "prop-types";
import "./style.css";

function Layout({ head, children, lang, changelang }) {
  const cn = bem("Layout");

  return (
    <div className={cn()}>
      <div className={cn("head")}>
        {head}

        <form>
          <select name="languages" onChange={(e) => changelang(e.target.value)}>
            <option value="en">English</option>
            <option value="ru">Русский</option>
          </select>
        </form>
      </div>
      <div className={cn("content")}>{children}</div>
    </div>
  );
}

Layout.propTypes = {
  head: propTypes.node,
  children: propTypes.node,
};

Layout.defaultProps = {};

export default React.memo(Layout);
