import React from "react";
import { Link } from "react-router-dom";
import { cn as bem } from "@bem-react/classname";
import propTypes from "prop-types";

import "./style.css";

function CommentTitleLogin({ idArticle, setIdUnder }) {
    const cn = bem('CommentTitleLogin')
    return (
        <p className={cn()}>
            <Link to="/login" state={{ back: location.pathname }} className={cn('link')}>Войдите</Link>, чтобы иметь возможность комментировать.
            {
                idArticle ?
                    <button className={cn('btn')} onClick={() => setIdUnder(idArticle)}>Отмена</button> :
                    null
            }
        </p>
    );
}

CommentTitleLogin.propTypes = {
    idArticle: propTypes.string,
    setIdUnder: propTypes.func,
}

CommentTitleLogin.defaultProps = {
    idArticle: null,
    setIdUnder: null
}

export default React.memo(CommentTitleLogin); 