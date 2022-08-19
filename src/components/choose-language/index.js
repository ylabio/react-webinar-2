import React, { useContext } from 'react';
import "./styles.css";
import { cn as bem } from "@bem-react/classname";
import { LanguageContext } from "../../services/language/context";

function ChooseLanguage() {
    const cn = bem('ChooseLanguage');
    const { language, toggleLanguage } = useContext(LanguageContext);

    return (
        <select
            className={cn()}
            value={language}
            onChange={(evt) => toggleLanguage(evt.target.value)}>
            <option value="ru">RU</option>
            <option value="en">EN</option>
        </select>
    );
}

export default React.memo(ChooseLanguage);