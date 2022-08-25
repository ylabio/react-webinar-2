import React from "react"
import {cn as bem} from '@bem-react/classname'
import './style.css';
import useTranslate from "../../hooks/use-translate";

function ProfileList(props){
    const cn = bem('ProfileList');
    const {t} = useTranslate()

    return(
        <div className={cn()}>
            <h2>{t('profile')}</h2>
            {props.items.map(item => {
                return(
                    <div className={cn('item')} key={item.title}>
                        <div className={cn('title')}>{item.title}:&nbsp;</div>
                        <div className={cn('value')}>{item.value}</div>
                    </div>
                )
                })}
        </div>
    )
}

export default React.memo(ProfileList)