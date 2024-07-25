import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.scss';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className='register-container'>
        <div className="register">
            <button onClick={() => navigate('/register')}>REGISTER</button>
        </div>
    </div>
  )
}
