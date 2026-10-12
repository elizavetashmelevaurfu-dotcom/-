import { useState } from 'react';
import { isLoggedIn } from './api/auth';
import HomePage            from './pages/HomePage';
import LoginPage           from './pages/LoginPage';
import SelectPage          from './pages/SelectPage';
import DetailPage          from './pages/DetailPage';
import FormPage            from './pages/FormPage';
import DeveloperOffersPage from './pages/DeveloperOffersPage';
import DeveloperFormPage   from './pages/DeveloperFormPage';
import MyJKPage            from './pages/MyJKPage';
import AnketyPage          from './pages/AnketyPage';

export default function App() {
  const [screen, setScreen] = useState('home');

  /* ── navigation helpers ── */
  const goHome   = () => setScreen('home');
  const goLogin  = () => setScreen('login');
  const goSelect = () => {
    if (!isLoggedIn()) { setScreen('login'); return; }
    setScreen('select');
  };
  const goDetail = () => setScreen('detail');
  const goForm   = () => setScreen('form');
  const goOffers = () => setScreen('offers');
  const goDeveloperForm = () => setScreen('developerForm');
  const goMyJK   = () => setScreen('myJK');
  const goAnkety = () => setScreen('ankety');
  const goLeads  = () => setScreen('leads'); // placeholder

  const handleSelect = (type) => {
    if (type === 'developer') {
      setScreen('developerForm');
    } else {
      setScreen('detail');
    }
  };

  /* ── shared navbar nav props (passed to all screens) ── */
  const navProps = {
    onLogoClick: goHome,
    onGoMyJK:    goMyJK,
    onGoAnkety:  goAnkety,
    onGoLeads:   goLeads,
  };

  return (
    <>
      {screen === 'home' && (
        <HomePage onEnter={goSelect} />
      )}
      {screen === 'login' && (
        <LoginPage onSuccess={goSelect} onLogoClick={goHome} />
      )}
      {screen === 'select' && (
        <SelectPage onSelect={handleSelect} {...navProps} />
      )}
      {screen === 'detail' && (
        <DetailPage onFillForm={goForm} onBack={goSelect} {...navProps} />
      )}
      {screen === 'form' && (
        <FormPage onBack={goDetail} {...navProps} />
      )}
      {screen === 'offers' && (
        <DeveloperOffersPage onBack={goForm} {...navProps} />
      )}
      {screen === 'developerForm' && (
        <DeveloperFormPage onBack={goHome} {...navProps} />
      )}
      {screen === 'myJK' && (
        <MyJKPage onBack={goHome} {...navProps} />
      )}
      {screen === 'ankety' && (
        <AnketyPage onBack={goHome} {...navProps} />
      )}
      {screen === 'leads' && (
        /* placeholder — same as ankety for now */
        <AnketyPage onBack={goHome} {...navProps} />
      )}
    </>
  );
}
