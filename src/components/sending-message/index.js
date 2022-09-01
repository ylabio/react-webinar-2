import React from "react";
import { Link } from "react-router-dom";
import './style.css';


function SendingMessage({ location, sendMessage, parentId }) {




    return (<div className="Message-container">
        <h5 className="Message-title">{parentId._type === 'comment' ? "Новый ответ" : "Новый комментарий"}</h5>
        <form>
            <textarea className="Message-input" placeholder={parentId._type === 'comment' ? `Мой ответ для ${parentId.author}` : "Текст"} type='text' />
            <Link className="Message-link" state='' to=""><button className="Message-button" onClick={() => {
                sendMessage(document.querySelector('.Message-input').value, parentId);
                document.querySelector('.Message-input').value = '';
            }}>Отправить</button> </Link>
            {parentId._type === 'comment' ? <Link className="Message-link" state='' to=""> <button className="Message-button">Отменить</button></Link> : ""}

        </form>
    </div>)

}

export default React.memo(SendingMessage);