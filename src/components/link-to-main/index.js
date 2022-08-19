import React, { useContext } from 'react';
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../services/language/context";
import Translation from "../../services/language";


function LinkToMain() {
    const cn = bem('LinkToMain');
    const { language } = useContext(LanguageContext);

    return (

        <Link className={cn()}
            to={`/`}>{Translation[language].actions.home}</Link>)

}

export default React.memo(LinkToMain);