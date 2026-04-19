import { useState } from 'react';
import Navbar from '../components/Navbar';
import { login }    from '../api/auth';
import { register } from '../api/profile';
import s from './LoginPage.module.css';

const DEMO_ACCOUNTS = [
  { role: 'Админ',       email: 'admin@mail.mail',   password: '123123' },
  { role: 'Пользователь', email: 'user@mail.mail',    password: '123123' },
  { role: 'Застройщик',  email: 'builder@mail.mail',  password: '123123' },
];

export default function LoginPage({ onSuccess, onLogoClick }) {
  const [mode,     setMode]     = useState('login');
  const [username, setUsername] = useState('');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState(null);

  const switchMode = (next) => {
    setMode(next);
    setError(null);
    setUsername('');
    setEmail('');
    setPassword('');
  };

  // Быстрый вход по клику на демо-аккаунт
  const fillDemo = (account) => {
    setUsername(account.email);
    setPassword(account.password);
    setError(null);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      if (mode === 'register') {
        await register({ userName: username, email, password });
        await login(email, password);
      } else {
        await login(username, password);
      }
      onSuccess();
    } catch (e) {
      setError(e.message || 'Что-то пошло не так');
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div className={s.page}>
      <Navbar onLogoClick={onLogoClick} isHome />
      <div className={s.card}>
        <h2 className={s.title}>
          {mode === 'login' ? 'Войти в ПЕНАТЫ' : 'Регистрация'}
        </h2>

        {mode === 'register' && (
          <>
            <p className={s.label}>Имя пользователя</p>
            <input
              className={s.input}
              placeholder="минимум 4 символа"
              value={username}
              onChange={e => setUsername(e.target.value)}
              onKeyDown={handleKey}
            />
          </>
        )}

        <p className={s.label}>
          {mode === 'login' ? 'Email или имя пользователя' : 'Email'}
        </p>
        <input
          className={s.input}
          placeholder="user@mail.com"
          value={mode === 'login' ? username : email}
          onChange={e =>
            mode === 'login'
              ? setUsername(e.target.value)
              : setEmail(e.target.value)
          }
          onKeyDown={handleKey}
        />

        <p className={s.label}>Пароль</p>
        <input
          className={s.input}
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={handleKey}
        />

        {error && <p className={s.error}>{error}</p>}

        <button
          className={s.btn}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading
            ? 'Загрузка...'
            : mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
        </button>

        <p className={s.switchRow}>
          {mode === 'login' ? (
            <>
              Нет аккаунта?{' '}
              <button className={s.switchLink} onClick={() => switchMode('register')}>
                Зарегистрироваться
              </button>
            </>
          ) : (
            <>
              Уже есть аккаунт?{' '}
              <button className={s.switchLink} onClick={() => switchMode('login')}>
                Войти
              </button>
            </>
          )}
        </p>

        {/* Демо-аккаунты — только на вкладке входа */}
        {mode === 'login' && (
          <div className={s.demoBlock}>
            <p className={s.demoTitle}>Быстрый вход</p>
            <div className={s.demoList}>
              {DEMO_ACCOUNTS.map(acc => (
                <button
                  key={acc.role}
                  className={s.demoBtn}
                  onClick={() => fillDemo(acc)}
                >
                  <span className={s.demoRole}>{acc.role}</span>
                  <span className={s.demoEmail}>{acc.email}</span>
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}