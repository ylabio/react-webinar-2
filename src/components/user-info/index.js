import React, {useState, useEffect} from 'react';
import './style.css';
import {cn as bem} from "@bem-react/classname";



function UserInfo(token) {
    const cn = bem('User');

    const [userData, setUserData] = useState({})
    useEffect(() => {
        fetch('/api/v1/users/self', {
            headers: {
                'X-Token': token.token
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data)
                setUserData(data?.result)
            });
    }, []);


    return (
        <div className={cn()}>
            <p className={cn('title')}>Профиль</p>
            <p className={cn('data')}><span>Имя:</span> <span className={cn('data-value')}>{userData?.profile?.name}</span></p>
            <p className={cn('data')}><span>Телефон:</span> <span className={cn('data-value')}>{userData?.profile?.phone}</span></p>
            <p className={cn('data')}><span>email:</span> <span className={cn('data-value')}>{userData?.email}</span></p>
        </div>
    )
}

export default React.memo(UserInfo)