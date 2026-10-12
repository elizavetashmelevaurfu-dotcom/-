// src/pages/AnketyPage.js
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { getAnkety, updateAnketaStatus } from '../api/storage';
import s from './AnketyPage.module.css';

export default function AnketyPage({ onBack, onLogoClick, onGoMyJK, onGoAnkety, onGoLeads }) {
  const [ankety, setAnkety] = useState(() => getAnkety());

  const handleSendOffer = (id) => {
    updateAnketaStatus(id, 'Отправлено предложение');
    setAnkety(getAnkety());
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
        <h1 className={s.title}>Анкеты</h1>

        {ankety.length === 0 && (
          <p className={s.empty}>
            Пока нет анкет. Заполните анкету как клиент.
          </p>
        )}

        <div className={s.list}>
          {ankety.map(a => (
            <div key={a.id} className={s.card}>
              <div className={s.cardHeader}>
                <div className={s.cardNum}>
                  <span className={s.numBold}>№{a.num}</span>
                  {a.name && <span className={s.numName}>{a.name}</span>}
                </div>
                <span className={
                  a.status === 'Отправлено предложение'
                    ? s.statusSent
                    : s.statusNew
                }>
                  {a.status}
                </span>
              </div>

              {a.status === 'Отправлено предложение' && (
                <div className={s.cardDetails}>
                  {a.city    && <p>{a.city}</p>}
                  {a.delivery && <p>{a.delivery}</p>}
                  {a.aptType && <p>{a.aptType}</p>}
                  {a.area    && <p>{a.area}</p>}
                  {a.budget  && <p>{a.budget}</p>}
                  {a.finance && <p className={s.financeTag}>{a.finance}</p>}
                </div>
              )}

              {a.status !== 'Отправлено предложение' && (
                <div className={s.cardActions}>
                  <button
                    className={s.offerBtn}
                    onClick={() => handleSendOffer(a.id)}
                  >
                    Отправить предложение
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}