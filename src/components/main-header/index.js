import React from "react";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import propTypes from "prop-types";
import translate from "../../utils/translate";

function MainHeader({languages, language, selectLanguage}){

    const cn = bem('MainHeader');

    return (
        <div className={cn()}>
            <h1>{translate(language, "main-header-title")}</h1>
            <div className={cn("control")}>
                {languages.map((language, i) => {
                    return <span key={i} className={cn("language")} onClick={() => {selectLanguage(language)}}>
                        {language}
                    </span>
                })}
            </div>
        </div>
    )
}

MainHeader.propTypes = {
    languages: propTypes.array.isRequired,
    language: propTypes.string.isRequired
}

MainHeader.defaultProps = {
    languages: [],
    language: "ru"
}
export default React.memo(MainHeader);