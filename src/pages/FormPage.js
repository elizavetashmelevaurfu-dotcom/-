import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import s from './FormPage.module.css';

export default function FormPage({ onBack, onLogoClick }) {
  const scrollRef = useRef(null);
  const [thumbPct, setThumbPct] = useState(0);

  /* Имя */
  const [name, setName] = useState('');
  const [nameVisible, setNameVisible] = useState(true);

  /* Локация */
  const [cityInput,     setCityInput]     = useState('');
  const [metroInput,    setMetroInput]    = useState('');
  const [districtInput, setDistrictInput] = useState('');
  const [cities,    setCities]    = useState(['Екатеринбург']);
  const [metros,    setMetros]    = useState(['м. Чайковская']);
  const [districts, setDistricts] = useState(['Чайковский']);
  const [metroTime, setMetroTime] = useState([]);

  /* Параметры квартиры */
  const [aptTypes,   setAptTypes]   = useState([]);
  const [euroFormat, setEuroFormat] = useState(false);
  const [euroTypes,  setEuroTypes]  = useState([]);
  const [areaMin,    setAreaMin]    = useState('');
  const [areaMax,    setAreaMax]    = useState('');
  const [floorMin,   setFloorMin]   = useState(1);
  const [floorMax,   setFloorMax]   = useState(53);
  const [finishes,   setFinishes]   = useState([]);
  const [budgetMin,  setBudgetMin]  = useState('');
  const [budgetMax,  setBudgetMax]  = useState('');

  const metroTimeOpts = [
    { label: 'до 5 минут',  val: '5'     },
    { label: '10-15 минут', val: '10-15' },
    { label: '5-10 минут',  val: '5-10'  },
    { label: 'от 15 минут', val: '15+'   },
  ];
  const aptTypeOpts  = ['Студия','2к квартира','4к квартира','Пентхаус','1к квартира','3к квартира','> 4 комнат'];
  const euroTypeOpts = ['Евро 1к','Евро 3к','Евро > 4 комнат','Евро 2к','Евро 4к'];
  const finishOpts   = [
    'Без отделки', 'Предчистовая «белая коробка»', 'С ремонтом (отделкой)',
    'Черновая',    'Чистовая',                     'С отделкой и мебелью',
  ];

  
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const ratio = el.scrollTop / (el.scrollHeight - el.clientHeight);
      setThumbPct(Math.min(82, Math.max(0, ratio * 82)));
    };
    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const toggle = (list, setList, val) =>
    setList(p => p.includes(val) ? p.filter(x => x !== val) : [...p, val]);

  const addTag = (val, setVal, list, setList) => {
    const v = val.trim();
    if (v && !list.includes(v)) setList([...list, v]);
    setVal('');
  };

  const keyAddTag = (e, val, setVal, list, setList) => {
    if (e.key === 'Enter') addTag(val, setVal, list, setList);
  };

  return (
    <div className={s.page}>
      <Navbar onLogoClick={onLogoClick} />
      <div className={s.inner}>
        <h1 className={s.pageTitle}>Моя анкета</h1>

        <div className={s.modalWrap}>

          
          <div className={s.modal} ref={scrollRef}>
            <button className={s.closeBtn} onClick={onBack}>×</button>

            
            
            <input
              className={s.input}
              placeholder="Введите ваше имя"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <label className={s.cbRow}>
              <input
                type="checkbox"
                checked={nameVisible}
                onChange={e => setNameVisible(e.target.checked)}
              />
              <span>
                Сделать имя видимым для застройщиков*
                <span className={s.noteText}>
                  *Те укажете имя застройщику получает данные. Вы всегда сможете воспользоваться этой функцией.
                </span>
              </span>
            </label>

            <hr className={s.divider} />

            
            <h3 className={s.sectionTitle}>Локация</h3>

            <div className={s.locRow}>
              
              <div>
                <input
                  className={s.input}
                  placeholder="Введите город(а)"
                  value={cityInput}
                  onChange={e => setCityInput(e.target.value)}
                  onKeyDown={e => keyAddTag(e, cityInput, setCityInput, cities, setCities)}
                />
                <div className={s.tagsRow}>
                  {cities.map(c => (
                    <span key={c} className={s.tag}
                      onClick={() => setCities(cities.filter(x => x !== c))}>
                      {c} ×
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <input
                  className={s.input}
                  placeholder="Введите ст. метро"
                  value={metroInput}
                  onChange={e => setMetroInput(e.target.value)}
                  onKeyDown={e => keyAddTag(e, metroInput, setMetroInput, metros, setMetros)}
                />
                <div className={s.tagsRow}>
                  {metros.map(m => (
                    <span key={m} className={s.tag}
                      onClick={() => setMetros(metros.filter(x => x !== m))}>
                      {m} ×
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className={s.locRow}>
              
              <div>
                <input
                  className={s.input}
                  placeholder="Введите район(ы)"
                  value={districtInput}
                  onChange={e => setDistrictInput(e.target.value)}
                  onKeyDown={e => keyAddTag(e, districtInput, setDistrictInput, districts, setDistricts)}
                />
                <div className={s.tagsRow}>
                  {districts.map(d => (
                    <span key={d} className={s.tag}
                      onClick={() => setDistricts(districts.filter(x => x !== d))}>
                      {d} ×
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <p className={s.subTitle} style={{ marginTop: 0 }}>Сколько времени до метро</p>
                <div className={s.cbGrid2}>
                  {metroTimeOpts.map(o => (
                    <label key={o.val} className={s.cbRow}>
                      <input type="checkbox"
                        checked={metroTime.includes(o.val)}
                        onChange={() => toggle(metroTime, setMetroTime, o.val)}
                      />
                      {o.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <hr className={s.divider} />

            
            <h3 className={s.sectionTitle}>Параметры квартиры</h3>
            <p className={s.subTitle}>Тип квартиры</p>
            <div className={s.cbGrid4}>
              {aptTypeOpts.map(o => (
                <label key={o} className={s.cbRow}>
                  <input type="checkbox"
                    checked={aptTypes.includes(o)}
                    onChange={() => toggle(aptTypes, setAptTypes, o)}
                  />
                  {o}
                </label>
              ))}
            </div>

            
            <hr className={s.divider} />

            
            <div className={s.toggleRow}>
              Евро-формат квартиры (кухня совмещена с гостиной)
              <div
                className={`${s.toggle} ${euroFormat ? s.toggleOn : s.toggleOff}`}
                onClick={() => setEuroFormat(v => !v)}
              >
                <div className={`${s.toggleKnob} ${euroFormat ? s.toggleKnobOn : s.toggleKnobOff}`} />
              </div>
            </div>
            <p className={s.subTitle}>Тип квартиры</p>
            <div className={s.cbGrid3}>
              {euroTypeOpts.map(o => (
                <label key={o} className={s.cbRow}>
                  <input type="checkbox"
                    checked={euroTypes.includes(o)}
                    onChange={() => toggle(euroTypes, setEuroTypes, o)}
                  />
                  {o}
                </label>
              ))}
            </div>

            
            <div className={s.twoCol}>
              <div>
                <p className={s.subTitle}>Минимальная площадь</p>
                <div className={s.inputWithUnit}>
                  <input className={s.input} placeholder="Введите число"
                    value={areaMin} onChange={e => setAreaMin(e.target.value)} />
                  <span className={s.unit}>кв.м</span>
                </div>
              </div>
              <div>
                <p className={s.subTitle}>Максимальная площадь</p>
                <div className={s.inputWithUnit}>
                  <input className={s.input} placeholder="Введите число"
                    value={areaMax} onChange={e => setAreaMax(e.target.value)} />
                  <span className={s.unit}>кв.м</span>
                </div>
              </div>
            </div>

            
            <p className={s.subTitle}>Этаж</p>
            <div className={s.floorRow}>
              <span className={s.floorLabel}>от</span>
              <input className={s.floorBox} type="number" min="1" max="60"
                value={floorMin} onChange={e => setFloorMin(Number(e.target.value))} />
              <input className={s.slider} type="range" min="1" max="60"
                value={floorMin} onChange={e => setFloorMin(Number(e.target.value))} />
              <input className={s.slider} type="range" min="1" max="60"
                value={floorMax} onChange={e => setFloorMax(Number(e.target.value))} />
              <span className={s.floorLabel}>до</span>
              <input className={s.floorBox} type="number" min="1" max="60"
                value={floorMax} onChange={e => setFloorMax(Number(e.target.value))} />
            </div>

            
            <p className={s.subTitle}>Вид отделки</p>
            <div className={s.cbGrid3}>
              {finishOpts.map(o => (
                <label key={o} className={s.cbRow}>
                  <input type="checkbox"
                    checked={finishes.includes(o)}
                    onChange={() => toggle(finishes, setFinishes, o)}
                  />
                  {o}
                </label>
              ))}
            </div>

            <hr className={s.divider} />

            
            <h3 className={s.sectionTitle}>Бюджет</h3>
            <div className={s.twoCol}>
              <div>
                <p className={s.subTitle}>Минимальная стоимость</p>
                <div className={s.inputWithUnit}>
                  <input className={s.input} placeholder="Введите число"
                    value={budgetMin} onChange={e => setBudgetMin(e.target.value)} />
                  <span className={s.unit}>кв.м</span>
                </div>
              </div>
              <div>
                <p className={s.subTitle}>Максимальная стоимость</p>
                <div className={s.inputWithUnit}>
                  <input className={s.input} placeholder="Введите число"
                    value={budgetMax} onChange={e => setBudgetMax(e.target.value)} />
                  <span className={s.unit}>кв.м</span>
                </div>
              </div>
            </div>

            <button className={s.saveBtn} onClick={onBack}>Сохранить анкету</button>
          </div>

          
          <div className={s.scrollbarCol}>
            <div className={s.sbTrack}>
              <div className={s.sbThumb} style={{ top: `${thumbPct}%` }} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
