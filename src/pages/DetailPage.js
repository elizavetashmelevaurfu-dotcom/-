import React from 'react';
import Navbar from '../components/Navbar';
import s from './DetailPage.module.css';

export default function DetailPage({ onFillForm, onBack, onLogoClick, onGoMyJK, onGoAnkety, onGoLeads }) {
  return (
    <div className={s.page}>
      <Navbar onLogoClick={onLogoClick} onGoMyJK={onGoMyJK} onGoAnkety={onGoAnkety} onGoLeads={onGoLeads} />
      <div className={s.modal}>
        <h2 className={s.title}>
          ПЕНАТЫ — ваш личный хранитель в поиске жилья.
        </h2>

        <p className={s.italic}>
          Никакого спама и навязчивых звонков. Только предложения от проверенных
          застройщиков, которые действительно подходят под ваш бюджет и район.
        </p>

        <p className={s.boldLabel}>Как это работает:</p>

        <p className={s.italic}>
          Вы заполняете анкету с пожеланиями — застройщики сами находят вас и
          предлагают варианты по вашим параметрам.
        </p>

        <p className={s.boldCta}>
          Сделайте первый шаг — расскажите, что ищете. Займет всего лишь 5 минут.
        </p>

        <div className={s.buttons}>
          <button className={s.btn} onClick={onFillForm}>Заполнить анкету</button>
          <button className={s.btn} onClick={onBack}>Не сейчас</button>
        </div>
      </div>
    </div>
  );
}
