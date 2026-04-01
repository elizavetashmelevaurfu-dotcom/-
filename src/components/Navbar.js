import React, { useState } from 'react';
import s from './Navbar.module.css';


const LOGO_SRC = `${process.env.PUBLIC_URL} /logo.png`;

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

export default function Navbar({ onLogoClick, isHome }) {
  return (
    <header className={s.bar}>

      
      <div className={s.logo} onClick={onLogoClick}>
        <img src={LOGO_SRC} alt="Логотип" className={s.logoImg} />
      </div>

      
      <div className={s.right}>
        <button className={s.cityBtn}>
          Екатеринбург&nbsp;<ChevronDown />
        </button>

        {isHome && <span>Войти</span>}
        <AvatarIcon />
        {!isHome && <ChevronDown />}
      </div>

    </header>
  );
}