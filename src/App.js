import { useState } from 'react';
import { isLoggedIn } from './api/auth';
import HomePage   from './pages/HomePage';
import LoginPage  from './pages/LoginPage';
import SelectPage from './pages/SelectPage';
import DetailPage from './pages/DetailPage';
import FormPage   from './pages/FormPage';

export default function App() {
  const [screen, setScreen] = useState('home');

  const goHome   = () => setScreen('home');
  const goLogin  = () => setScreen('login');
  const goSelect = () => {
    // Если не залогинен — сначала на логин
    if (!isLoggedIn()) { setScreen('login'); return; }
    setScreen('select');
  };
  const goDetail = () => setScreen('detail');
  const goForm   = () => setScreen('form');

  return (
    <>
      {screen === 'home'   && <HomePage   onEnter={goSelect} />}
      {screen === 'login'  && <LoginPage  onSuccess={goSelect} onLogoClick={goHome} />}
      {screen === 'select' && <SelectPage onSelect={goDetail}  onLogoClick={goHome} />}
      {screen === 'detail' && <DetailPage onFillForm={goForm}  onBack={goSelect} onLogoClick={goHome} />}
      {screen === 'form'   && <FormPage   onBack={goDetail}    onLogoClick={goHome} />}
    </>
  );
}