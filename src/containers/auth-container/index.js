import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../store/authcontext";

const AuthContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, set] = useState(null);
    const [err, setErr] = useState(null);
    
    const toLogin = () => navigate('/login');

    const logIn = async (password, login) => {
      const query = '/api/v1/users/sign';
      const body = JSON.stringify({
        login,
        password,
        remeber: true
      });
      const res = await fetch(query, {
        method: 'POST',
        body,
        headers: {'Content-Type': 'application/json'}
      });
      if (res.ok) {
        const { result } = await res.json()
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', JSON.stringify(result.token));
        set(result.user);
        err && setErr(null);
      } else {
        const { error : { data } } = await res.json()
        setErr(data.issues[0].message)
      }
    };
    
    const logOut = () => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      navigate('/login')
    };

    return (
      <AuthContext.Provider value={{
        user, err, toLogin, logIn, logOut
      }}
      >
        {children}
      </AuthContext.Provider>
    );
  };

  export default React.memo(AuthContextProvider);
