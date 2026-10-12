import React from 'react';
import Navbar from '../components/Navbar';
import s from './SelectPage.module.css';

export default function SelectPage({ onSelect, onLogoClick, onGoMyJK, onGoAnkety, onGoLeads }) {
  return (
    <div className={s.page}>
      <Navbar onLogoClick={onLogoClick} onGoMyJK={onGoMyJK} onGoAnkety={onGoAnkety} onGoLeads={onGoLeads} />
      <div className={s.center}>
        <div className={s.card} onClick={() => onSelect('seeker')}>
          <p className={s.cardText}>Я ищу ПЕНАТЫ</p>
        </div>
        <div className={s.card} onClick={() => onSelect('developer')}>
          <p className={s.cardText}>Я застройщик</p>
        </div>
      </div>
    </div>
  );
}
