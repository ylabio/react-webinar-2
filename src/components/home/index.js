import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './styles.css';
import { useNavigate } from "react-router-dom";

function Home() {
  const cn = bem('Home');
  let navigate = useNavigate();

  function goHome(){
    navigate("../");
  }

  return (
    <span className={cn()} onClick={goHome}>Главная</span>
  )
}

export default React.memo(Home);
