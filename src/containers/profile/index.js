import React, {useEffect} from "react";
import ProfileLayout from "../../components/profile-layout";
import useSelector from "../../hooks/use-selector";
import { useNavigate } from "react-router-dom";

function Profile(){
  const navigate = useNavigate();
  const select = useSelector(state=>({
    user: state.user
  }));
  
  useEffect(()=>{
    if (!localStorage.getItem('token')) navigate('/login');
  });

  return (
   <ProfileLayout user={select.user} />
  )
  
}

export default React.memo(Profile);
