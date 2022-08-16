import React from 'react';
import { useNavigate } from "react-router-dom"
import { cn as bem } from "@bem-react/classname";

import './styles.css';

const ProfileHeader = ({ children }) => {

    const cn = bem('ProfileHeader');
    let navigate = useNavigate()

    return (
            <div className={cn('header')} >
                <section
                    className={cn('home-link')}
                    onClick={() => navigate(`/`)}
                >
                    Главная
                </section>
                {children}
            </div>
    )
}

export default ProfileHeader