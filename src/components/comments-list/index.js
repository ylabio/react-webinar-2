import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import SendingMessage from "../sending-message";
import "./style.css"
import { Fragment } from 'react';

function CommentsList({ callbacks, render, comments, other }) {

    const { token, parentId, location } = other;
    const locationAndToken = { location, token };

    const scrollEl = comments.find(el => el.id);

    useEffect(() => {
        if (scrollEl) {
            document.getElementById(`${scrollEl.id}`).scrollIntoView();
            console.log('yes');
        }
    }, [scrollEl]);

    return (<div className="Comments">
        <h2 className="Comments-title">Коментарии ({comments.length})</h2>
        <div className="Comments-container">
            {comments.map((comment, index) => {
                return (<Fragment key={index}>
                    {render(callbacks, comment, locationAndToken)}
                </Fragment>)
            })}
            {location.state ? "" : (token ? <SendingMessage parentId={parentId} sendMessage={callbacks} />
                : <p className="Comments-link"><Link className="Comments-login" state={{ back: window.location.pathname }} to="/login">Войдите</Link>, чтобы иметь возможность комментировать</p>)}
        </div>
    </div>)

}

export default React.memo(CommentsList);