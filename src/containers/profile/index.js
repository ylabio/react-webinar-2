import React from "react";
import ProfileLayout from "../../components/profile-layout";
import useSelector from "../../hooks/use-selector";

function Profile(){
  
  const select = useSelector(state=>({
    user: state.user
  }));
  
  return (
   <ProfileLayout user={select.user} />
  )
  
}

export default React.memo(Profile);