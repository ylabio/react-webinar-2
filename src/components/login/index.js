import React from 'react';
import './style.css';
import { Link, useNavigate } from 'react-router-dom';

function Login({ name, exit }) {
  const navigate = useNavigate();

  return (
    <div className='login'>
      {name === undefined ? (
        <button onClick={() => navigate('../login')} className='button'>
          Вход
        </button>
      ) : (
        <div className='authBlock'>
          <Link to='../profile'>
            <p>{name}</p>
          </Link>
          <button onClick={exit} className='button'>
            Выход
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;
