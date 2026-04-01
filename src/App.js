import React, { useState } from 'react';
import HomePage   from './pages/HomePage';
import SelectPage from './pages/SelectPage';
import DetailPage from './pages/DetailPage';
import FormPage   from './pages/FormPage';

export default function App() {
  const [screen, setScreen] = useState('home');

  const goHome   = () => setScreen('home');
  const goSelect = () => setScreen('select');
  const goDetail = () => setScreen('detail');
  const goForm   = () => setScreen('form');

  return (
    <>
      {screen === 'home'   && <HomePage   onEnter={goSelect} />}
      {screen === 'select' && <SelectPage onSelect={goDetail} onLogoClick={goHome} />}
      {screen === 'detail' && <DetailPage onFillForm={goForm} onBack={goSelect} onLogoClick={goHome} />}
      {screen === 'form'   && <FormPage   onBack={goDetail}   onLogoClick={goHome} />}
    </>
  );
}
