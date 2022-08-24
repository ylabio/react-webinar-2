import React, { useEffect, useCallback } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useStore from "../../hooks/use-store";
import { getUserInfo } from "../../service/user";
import { getCookie, setCookie } from "../../utils/coockie";

export const RequireAuth = ({ children }) => {
  const store = useStore();
  const token = getCookie('token');
  const navigate = useNavigate();

  const checkAuth = useCallback(async () =>{
    try {
      await store.get('authorize').sessionCheck(token);
    } catch (error) {
      navigate('/authorization');
    }
  });


  useEffect(() => {
    checkAuth();
  }, []);

  return children;
};
