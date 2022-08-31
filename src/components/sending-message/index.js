import React from "react";
import { Link } from "react-router-dom";
import './style.css';


function SendingMessage({ location, sendMessage, parentId }) {





    return (<div className="Message-container">
        <h5 className="Message-title">{parentId._type === 'comment' ? "Новый ответ" : "Новый комментарий"}</h5>
        <form onSubmit={(e) => {
            e.preventDefault()
            if (location) location.state = "";
            sendMessage(e.target[0].value, parentId)
            e.target[0].value = "";
        }}>
            <textarea className="Message-input" placeholder={parentId._type === 'comment' ? `Мой ответ для ${parentId.author}` : "Текст"} type='text' />
            <button className="Message-button" type="submit">Отправить</button>
            {parentId._type === 'comment' ? <Link className="Message-link" state='' to=""> <button className="Message-button">Отменить</button></Link> : ""}

        </form>
    </div>)

}

export default React.memo(SendingMessage);