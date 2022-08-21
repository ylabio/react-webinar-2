import React from "react";
import "./style.css";

function ProfileForm({ name, email, phone }) {



    return (
        <div className="container-profile">
            <h2>Профиль</h2>
            <p>Имя: <strong>{name}</strong></p>
            <p>Телефон: <strong>{phone}</strong></p>
            <p>email: <strong>{email}</strong></p>
        </div>
    )



}


export default React.memo(ProfileForm);