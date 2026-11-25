import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { getMyJK, toggleJKLike } from '../api/storage';
import s from './MyJKPage.module.css';

const HeartIcon = ({ filled }) => (
  <svg width="22" height="20" viewBox="0 0 22 20" fill="none">
    <path
      d="M11 18.5C11 18.5 1.5 12.5 1.5 6.5C1.5 3.46 3.96 1 7 1C8.76 1 10.32 1.86 11 3.15C11.68 1.86 13.24 1 15 1C18.04 1 20.5 3.46 20.5 6.5C20.5 12.5 11 18.5 11 18.5Z"
      fill={filled ? 'white' : 'none'}
      stroke="white"
      strokeWidth="1.6"
    />
  </svg>
);

export default function MyJKPage({ onBack, onLogoClick, onGoMyJK, onGoAnkety, onGoLeads }) {
  const [list, setList] = useState(() => getMyJK());

  const handleToggleLike = (id) => {
    toggleJKLike(id);
    setList(getMyJK());
  };

  return (
    <div className={s.page}>
      <Navbar
        onLogoClick={onLogoClick}
        onGoMyJK={onGoMyJK}
        onGoAnkety={onGoAnkety}
        onGoLeads={onGoLeads}
      />
      <div className={s.inner}>
        <h1 className={s.title}>Мои ЖК</h1>

        {list.length === 0 && (
          <p className={s.empty}>
            Пока нет добавленных ЖК. Заполните анкету застройщика.
          </p>
        )}

        <div className={s.list}>
          {list.map(item => (
            <div key={item.id} className={s.card}>
              <span className={s.cardName}>{item.name}</span>
              <div className={s.cardRight}>
                <span className={s.status}>
                  {item.viewed ? 'Просмотрено' : 'Не просмотрено'}
                </span>
                <button
                  className={s.heartBtn}
                  onClick={() => handleToggleLike(item.id)}
                  aria-label="Избранное"
                >
                  <HeartIcon filled={item.liked} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}