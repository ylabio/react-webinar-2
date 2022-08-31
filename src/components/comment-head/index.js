import React from "react";
import useTranslate from "../../hooks/use-translate";
import './style.css'


function CommentHead({count}){
    const {t} = useTranslate()
    return(
        <div className='Head'><h3>{t('commnets')}&nbsp;({count})</h3></div>
    )
}

export default CommentHead