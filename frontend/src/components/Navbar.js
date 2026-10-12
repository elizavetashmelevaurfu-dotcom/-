import React, { useState, useRef, useEffect } from 'react';
import s from './Navbar.module.css';
import { logout, isLoggedIn } from '../api/auth';

const ChevronDown = () => (
  <svg width="11" height="7" viewBox="0 0 11 7" fill="none">
    <path d="M1 1l4.5 4.5L10 1" stroke="white" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AvatarIcon = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
    <circle cx="15" cy="15" r="14" stroke="white" strokeWidth="1.5" />
    <circle cx="15" cy="12" r="4.5" stroke="white" strokeWidth="1.5" />
    <path d="M5.5 26c0-5.5 4.5-9 9.5-9s9.5 3.5 9.5 9"
      stroke="white" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const LogoutIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M6 14H3a1 1 0 01-1-1V3a1 1 0 011-1h3M10 11l3-3-3-3M13 8H6"
      stroke="#56280F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Navbar({ onLogoClick, isHome, onGoMyJK, onGoAnkety, onGoLeads }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const loggedIn = isLoggedIn();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    if (onLogoClick) onLogoClick(); // go home
  };

  const handleMenuItem = (fn) => {
    setMenuOpen(false);
    if (fn) fn();
  };

  return (
    <header className={s.bar}>
      <div className={s.logo} onClick={onLogoClick}>
        <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Логотип" className={s.logoImg} />
      </div>

      <div className={s.right}>
        <button className={s.cityBtn}>
          Екатеринбург&nbsp;<ChevronDown />
        </button>

        {isHome && <span>Войти</span>}

        {/* Profile button with dropdown */}
        <div className={s.profileWrap} ref={menuRef}>
          <button
            className={s.profileBtn}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Меню профиля"
          >
            <AvatarIcon />
            {!isHome && <ChevronDown />}
          </button>

          {menuOpen && (
            <div className={s.dropdown}>
              <button className={s.dropItem} onClick={() => handleMenuItem(onGoMyJK)}>
                Мои ЖК
              </button>
              <button className={s.dropItem} onClick={() => handleMenuItem(onGoAnkety)}>
                Анкеты
              </button>
              <button className={s.dropItem} onClick={() => handleMenuItem(onGoLeads)}>
                Целевые лиды
              </button>
              <div className={s.dropDivider} />
              <button className={`${s.dropItem} ${s.dropItemLogout}`} onClick={handleLogout}>
                Выйти&nbsp;&nbsp;<LogoutIcon />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
