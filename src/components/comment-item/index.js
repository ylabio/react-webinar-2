import React from "react";
import SendingMessage from "../sending-message";
import { Link } from "react-router-dom";
import genDate from "../../utils/genDate";
import "./style.css";

function CommentItem({ comment, callbacks, links }) {
    const { token, stateLink } = links;
    const sendMessage = callbacks;
    const parentId = comment;
    const nesting = comment.nesting.length - 1;
    const data = genDate(new Date(comment.dateCreate)).replace("г.,", " в");
    return (<div style={{ width: `${944 - nesting * 30}px` }}>
        <div className="Comment-title">
            <h5 className="Comment-author">{comment.author}</h5>
            <p className="Comment-data">{data}</p>
        </div>
        <p className="Comment-text">{comment.text}</p>
        <Link className="Comment-link" state={comment._id} to="">Ответить</Link>
        <div className="Comment-sending">
            {stateLink === comment._id ? (token ? <SendingMessage className="Send-message" sendMessage={sendMessage} parentId={parentId} /> :
                <p className="Comment-login">
                    <Link className="Comment-in" state={{ back: window.location.pathname }} to="/login">Войдите</Link>, чтобы иметь возможность комментировать <Link className="Comment-cancel" state="" to=''>Отмена</Link></p>) :
                ""}
        </div>
    </div>)

}


export default React.memo(CommentItem);