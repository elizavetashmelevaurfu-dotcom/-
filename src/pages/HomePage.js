import React from 'react';
import Navbar from '../components/Navbar';
import s from './HomePage.module.css';

export default function HomePage({ onEnter }) {
  return (
    <div className={s.page} onClick={onEnter}>
      <Navbar isHome />
      <h1 className={s.heading}>П е н а т ы</h1>
      <div
        className={s.hero}
        style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/hero.jpg)` }}
      />
    </div>
  );
}