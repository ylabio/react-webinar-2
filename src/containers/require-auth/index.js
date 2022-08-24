import React, { useEffect, useCallback } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { getUserInfo } from "../../service/user";
import { getCookie, setCookie } from "../../utils/coockie";

export const RequireAuth = ({ children }) => {
  const token = getCookie('token');
  const navigate = useNavigate();

  const checkAuth = useCallback(async () =>{
    try {
      await getUserInfo(token); 
    } catch (error) {
      setCookie('token', '');
      navigate('/authorization');
    }
  });


  useEffect(() => {
    checkAuth();
  }, []);

  return children;
};