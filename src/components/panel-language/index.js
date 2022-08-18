import React, { useCallback } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function PanelLanguage({ changeLanguage, language }) {
  const cn = bem("Language");

  return (
    <div onClick={() => changeLanguage()} className={cn()}>
      <span className={cn(!language && "active")}>ru</span>/
      <span className={cn(language && "active")}>en</span>
    </div>
  );
}

export default React.memo(PanelLanguage);
