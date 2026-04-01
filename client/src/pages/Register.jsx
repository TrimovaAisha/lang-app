import './Auth.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await API.post('/auth/register', { email, password });
      alert('Успешная регистрация');
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Ошибка регистрации');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <input
          className="auth-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="auth-input"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="auth-button" onClick={handleRegister}>
          Зарегистрироваться
        </button>

        <p className="auth-link" onClick={() => navigate('/')}>
          Уже есть аккаунт?
        </p>
      </div>
    </div>
  );
}

export default Register;