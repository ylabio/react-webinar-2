import React from 'react';
import { useNavigate } from 'react-router-dom';

import './style.css';

function Menu() {
  const navigate = useNavigate();
  return (
    <ul>
      <li
        className='btn'
        onClick={() => {
          navigate('/');
        }}>
        Главная
      </li>
    </ul>
  );
}

export default React.memo(Menu);
