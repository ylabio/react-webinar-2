import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import useLanguage from "utils/use-language";

function NotFounts() {
  const cn = bem('NotFount');

  const translation = useLanguage()

  return (
    <div className={cn()}>
      {translation('notFounts')}
    </div>
  )
}



export default NotFounts;
