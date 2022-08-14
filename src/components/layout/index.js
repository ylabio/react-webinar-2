import React from "react";
import { cn as bem } from "@bem-react/classname";
import propTypes from "prop-types";
import "./style.css";
import useStore from "../../utils/use-store";

function Layout({ head, children }) {
  const cn = bem("Layout");
  const store = useStore();
  const value = store.get("language").getState().currentLanguage;

  return (
    <div className={cn()}>
      <div className={cn("head")}>
        {head}
        <select
          value={value}
          onChange={(e) => store.get("language").setLanguage(e.target.value)}
        >
          <option value="ru">русский</option>
          <option value="en">english</option>
        </select>
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
