import React from 'react';
import s from './DeveloperOffersPage.module.css';

//import houseImg from 'src/assets/petrovskoe.png'; 

export default function DeveloperOffersPage() {
  return (
    <div className={s.page}>
      <div className={s.inner}>
        <h1 className={s.pageTitle}>
          Предложения от застройщиков
        </h1>

        <div className={s.modalWrap}>
          <div className={s.modal}>
            <button className={s.closeBtn}>
              ×
            </button>

            <div className={s.card}>
              <div className={s.left}>
                <h2 className={s.title}>
                  ЖК “Петровское”
                </h2>

                <img
                  src={houseImg}
                  alt="ЖК Петровское"
                  className={s.image}
                />
              </div>

              <div className={s.right}>
                <h3 className={s.status}>
                  Просмотрено
                </h3>

                <div className={s.info}>
                  <p>г. Екатеринбург</p>
                  <p>Срок сдачи: 2 кв. 2025 г.</p>
                  <p>2к квартира</p>
                  <p>50 м²</p>
                  <p>7 000 000 рублей</p>
                </div>

                <div className={s.installment}>
                  Рассрочка
                </div>
              </div>
            </div>
          </div>

          <div className={s.scrollbarCol}>
            <div className={s.sbTrack}>
              <div className={s.sbThumb} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}