import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../store/authcontext";
import axios from 'axios';

const AuthContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const toLogin = () => navigate('/login');

    const logIn = async (password, login) => {
      const query = '/api/v1/users/sign';
      const body = JSON.stringify({
        login: `${login.slice(0, -2)}@example.com`,
        password,
        remeber: true
      });
      const res = await fetch(query, {
        method: 'POST',
        body,
        headers: {'Content-Type': 'application/json'}
      });
      const { result } = await res.json()
      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('token', JSON.stringify(result.token));
      setUser(result.user);
    };
    const logOut = () => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      navigate('/')
      setUser(null);
    };

    return (
      <AuthContext.Provider value={{
        user, toLogin, logIn, logOut
      }}
      >
        {children}
      </AuthContext.Provider>
    );
  };

  export default React.memo(AuthContextProvider);