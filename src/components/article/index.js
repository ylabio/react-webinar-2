import React, { useCallback, useContext } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import "./style.css";
import { LanguageContext } from "../../services/language/context";
import Translation from "../../services/language";

function Article(props) {
    const cn = bem('Article');
    const { language } = useContext(LanguageContext);

    const callbacks = {
        onAdd: useCallback((e) => props.onAdd(props.item.id), [props.onAdd, props.item])
    };

    return (
        <div className={cn()}>
            <p>{props.item.description}</p>
            <p className={cn('info')}>{Translation[language].item.country}: <span>{props.item.country} ({props.item.countryCode})</span></p>
            <p className={cn('info')}>{Translation[language].item.category}: <span>{props.item.category}</span></p>
            <p className={cn('info')}>{Translation[language].item.edition}: <span>{props.item.editionYear}</span></p>
            <p className={cn('price')}>{Translation[language].item.price}: {numberFormat(props.item.price)} ₽</p>
            <button className={cn('button')}
                onClick={callbacks.onAdd}>{Translation[language].actions.add}</button>
        </div >
    )
}

Article.propTypes = {
    item: propTypes.object.isRequired,
    onAdd: propTypes.func,
}

Article.defaultProps = {
    onAdd: () => { },
}

export default React.memo(Article);