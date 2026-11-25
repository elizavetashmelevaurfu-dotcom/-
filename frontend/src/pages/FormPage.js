import { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
//import { createAnketa } from '../api/anketa';
//import { saveAnketaLocally } from './AnketyPage';
import s from './FormPage.module.css';
import { saveAnketa } from '../api/storage';

export default function FormPage({ onBack, onLogoClick, onGoMyJK, onGoAnkety, onGoLeads }) {
  const scrollRef = useRef(null);
  const [thumbPct, setThumbPct] = useState(0);

  /* Имя */
  const [name,        setName]        = useState('');
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

  /* Состояние запроса */
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState(null);
  const [success,     setSuccess]     = useState(false);
  const [validErrors, setValidErrors] = useState({});
  /* Frame 21 */
const [isActive, setIsActive] = useState(true);

const [cashOptionsSelected, setCashOptionsSelected] = useState([]);
const [financeTools, setFinanceTools] = useState([]);
const [financeComment, setFinanceComment] = useState('');
const [monthlyPayment, setMonthlyPayment] = useState('');

const [purchaseTerm, setPurchaseTerm] = useState('');
const [completionYearFrom, setCompletionYearFrom] = useState(2019);
const [completionYearTo, setCompletionYearTo] = useState(2040);

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

  const cashOptions = [
  'Да, есть вся сумма (наличные)',
  'Да, есть вся сумма (безналичные)',
  'Нет, планирую воспользоваться фин инструментами',
];

const financeOptions = [
  'Ипотека',
  'Рассрочка',
  'Другое',
  'Обмен квартиры',
  'ИТ-ипотека',
  'Военная ипотека',
  'Семейная ипотека',
  'ДВ ипотека',
];

const purchaseOptions = [
  'В ближайшее время',
  'В ближайший месяц',
  'В ближайшие 3 месяца',
  'В ближайшие полгода',
];
  /* Кастомный скроллбар */
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

  const clearErr = (key) => setValidErrors(p => { const n = { ...p }; delete n[key]; return n; });

  /* Валидация */
  const validate = () => {
    const errs = {};
    if (cities.length === 0)
      errs.cities = 'Укажите хотя бы один город';
    if (districts.length === 0)
      errs.districts = 'Укажите хотя бы один район';
    if (aptTypes.length === 0 && euroTypes.length === 0)
      errs.aptTypes = 'Выберите тип квартиры';
    if (!areaMin)
      errs.areaMin = 'Укажите минимальную площадь';
    if (!areaMax)
      errs.areaMax = 'Укажите максимальную площадь';
    if (!floorMin && !floorMax)
      errs.floor = 'Укажите предпочтения по этажу';
    if (finishes.length === 0)
      errs.finishes = 'Выберите вид отделки';
    if (!budgetMin)
      errs.budgetMin = 'Укажите минимальный бюджет';
    if (!budgetMax)
      errs.budgetMax = 'Укажите максимальный бюджет';
    return errs;
  };

  /* Отправка */
  const handleSave = async () => {
  const errs = validate();
  if (Object.keys(errs).length > 0) {
    setValidErrors(errs);
    if (scrollRef.current) scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  setValidErrors({});
  setLoading(true);
  setError(null);
  setSuccess(false);

  try {
    saveAnketa({
      name, cities, metros, districts, metroTime,
      aptTypes, euroTypes, euroFormat,
      areaMin, areaMax, floorMin, floorMax,
      finishes, budgetMin, budgetMax,
      financeTools,
    });
    setSuccess(true);
  } catch (e) {
    setError(e.message || 'Ошибка при сохранении');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className={s.page}>
      <Navbar onLogoClick={onLogoClick} onGoMyJK={onGoMyJK} onGoAnkety={onGoAnkety} onGoLeads={onGoLeads} />
      <div className={s.inner}>
        <div className={s.headerRow}>
  <div className={s.headerLeft}>
    <h1 className={s.pageTitle}>Моя анкета</h1>

    <div
      className={`${s.toggle} ${isActive ? s.toggleOn : s.toggleOff}`}
      onClick={() => setIsActive(!isActive)}
    >
      <div
        className={`${s.toggleKnob}
        ${isActive ? s.toggleKnobOn : s.toggleKnobOff}`}
      />
    </div>

    <span className={s.activeText}>Активна</span>
  </div>

  <button
    className={s.topSaveBtn}
    onClick={handleSave}
  >
    Сохранить изменения
  </button>
</div>

        <div className={s.modalWrap}>
          <div className={s.modal} ref={scrollRef}>
            <button className={s.closeBtn} onClick={onBack}>×</button>

            {/* Сводка ошибок */}
            {Object.keys(validErrors).length > 0 && (
              <div className={s.summaryErrors}>
                {Object.values(validErrors).map((e, i) => (
                  <p key={i}>⚠ {e}</p>
                ))}
              </div>
            )}

            {/* Имя */}
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

            {/* ЛОКАЦИЯ */}
            <h3 className={s.sectionTitle}>Локация</h3>

            <div className={s.locRow}>
              {/* Города — обязательно */}
              <div>
                <p className={s.subTitle}>
                  Желаемые города <span style={{ color: '#c0392b' }}>*</span>
                </p>
                <input
                  className={`${s.input} ${validErrors.cities ? s.inputError : ''}`}
                  placeholder="Введите город и нажмите Enter"
                  value={cityInput}
                  onChange={e => setCityInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      addTag(cityInput, setCityInput, cities, setCities);
                      clearErr('cities');
                    }
                  }}
                />
                <div className={s.tagsRow}>
                  {cities.map(c => (
                    <span key={c} className={s.tag}
                      onClick={() => setCities(cities.filter(x => x !== c))}>
                      {c} ×
                    </span>
                  ))}
                </div>
                {validErrors.cities && <p className={s.fieldError}>⚠ {validErrors.cities}</p>}
              </div>

              {/* Метро */}
              <div>
                <p className={s.subTitle}>Станции метро</p>
                <input
                  className={s.input}
                  placeholder="Введите ст. метро и нажмите Enter"
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
              {/* Районы — обязательно */}
              <div>
                <p className={s.subTitle}>
                  Районы <span style={{ color: '#c0392b' }}>*</span>
                </p>
                <input
                  className={`${s.input} ${validErrors.districts ? s.inputError : ''}`}
                  placeholder="Введите район и нажмите Enter"
                  value={districtInput}
                  onChange={e => setDistrictInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      addTag(districtInput, setDistrictInput, districts, setDistricts);
                      clearErr('districts');
                    }
                  }}
                />
                <div className={s.tagsRow}>
                  {districts.map(d => (
                    <span key={d} className={s.tag}
                      onClick={() => setDistricts(districts.filter(x => x !== d))}>
                      {d} ×
                    </span>
                  ))}
                </div>
                {validErrors.districts && <p className={s.fieldError}>⚠ {validErrors.districts}</p>}
              </div>

              {/* Время до метро */}
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

            {/* ТИП КВАРТИРЫ — обязательно */}
            <h3 className={s.sectionTitle}>Параметры квартиры</h3>
            <p className={s.subTitle}>
              Тип квартиры <span style={{ color: '#c0392b' }}>*</span>
            </p>
            <div
              className={s.cbGrid4}
              style={validErrors.aptTypes ? { border: '1.5px solid #c0392b', borderRadius: 7, padding: 8 } : {}}
            >
              {aptTypeOpts.map(o => (
                <label key={o} className={s.cbRow}>
                  <input type="checkbox"
                    checked={aptTypes.includes(o)}
                    onChange={() => { toggle(aptTypes, setAptTypes, o); clearErr('aptTypes'); }}
                  />
                  {o}
                </label>
              ))}
            </div>
            {validErrors.aptTypes && <p className={s.fieldError}>⚠ {validErrors.aptTypes}</p>}

            <hr className={s.divider} />

            {/* ЕВРО-ФОРМАТ */}
            <div className={s.toggleRow}>
              Евро-формат квартиры (кухня совмещена с гостиной)
              <div
                className={`${s.toggle} ${euroFormat ? s.toggleOn : s.toggleOff}`}
                onClick={() => setEuroFormat(v => !v)}
              >
                <div className={`${s.toggleKnob} ${euroFormat ? s.toggleKnobOn : s.toggleKnobOff}`} />
              </div>
            </div>
            {euroFormat && (
              <>
                <p className={s.subTitle}>Тип евро-квартиры</p>
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
              </>
            )}

            {/* ПЛОЩАДЬ — обязательно */}
            <div className={s.twoCol}>
              <div>
                <p className={s.subTitle}>
                  Минимальная площадь <span style={{ color: '#c0392b' }}>*</span>
                </p>
                <div className={s.inputWithUnit}>
                  <input
                    className={`${s.input} ${validErrors.areaMin ? s.inputError : ''}`}
                    placeholder="Введите число"
                    value={areaMin}
                    onChange={e => { setAreaMin(e.target.value); clearErr('areaMin'); }}
                  />
                  <span className={s.unit}>кв.м</span>
                </div>
                {validErrors.areaMin && <p className={s.fieldError}>⚠ {validErrors.areaMin}</p>}
              </div>
              <div>
                <p className={s.subTitle}>
                  Максимальная площадь <span style={{ color: '#c0392b' }}>*</span>
                </p>
                <div className={s.inputWithUnit}>
                  <input
                    className={`${s.input} ${validErrors.areaMax ? s.inputError : ''}`}
                    placeholder="Введите число"
                    value={areaMax}
                    onChange={e => { setAreaMax(e.target.value); clearErr('areaMax'); }}
                  />
                  <span className={s.unit}>кв.м</span>
                </div>
                {validErrors.areaMax && <p className={s.fieldError}>⚠ {validErrors.areaMax}</p>}
              </div>
            </div>

            {/* ЭТАЖ — обязательно */}
            <p className={s.subTitle}>
              Предпочтения по этажу <span style={{ color: '#c0392b' }}>*</span>
            </p>
            <div className={s.floorRow}>
              <span className={s.floorLabel}>от</span>
              <input className={s.floorBox} type="number" min="1" max="60"
                value={floorMin}
                onChange={e => { setFloorMin(Number(e.target.value)); clearErr('floor'); }}
              />
              <input className={s.slider} type="range" min="1" max="60"
                value={floorMin}
                onChange={e => setFloorMin(Number(e.target.value))}
              />
              <input className={s.slider} type="range" min="1" max="60"
                value={floorMax}
                onChange={e => setFloorMax(Number(e.target.value))}
              />
              <span className={s.floorLabel}>до</span>
              <input className={s.floorBox} type="number" min="1" max="60"
                value={floorMax}
                onChange={e => setFloorMax(Number(e.target.value))}
              />
            </div>
            {validErrors.floor && <p className={s.fieldError}>⚠ {validErrors.floor}</p>}

            {/* ОТДЕЛКА — обязательно */}
            <p className={s.subTitle}>
              Вид отделки <span style={{ color: '#c0392b' }}>*</span>
            </p>
            <div
              className={s.cbGrid3}
              style={validErrors.finishes ? { border: '1.5px solid #c0392b', borderRadius: 7, padding: 8 } : {}}
            >
              {finishOpts.map(o => (
                <label key={o} className={s.cbRow}>
                  <input type="checkbox"
                    checked={finishes.includes(o)}
                    onChange={() => { toggle(finishes, setFinishes, o); clearErr('finishes'); }}
                  />
                  {o}
                </label>
              ))}
            </div>
            {validErrors.finishes && <p className={s.fieldError}>⚠ {validErrors.finishes}</p>}

            <hr className={s.divider} />

            {/* БЮДЖЕТ — обязательно */}
            <h3 className={s.sectionTitle}>Бюджет</h3>
            <div className={s.twoCol}>
              <div>
                <p className={s.subTitle}>
                  Минимальная стоимость <span style={{ color: '#c0392b' }}>*</span>
                </p>
                <div className={s.inputWithUnit}>
                  <input
                    className={`${s.input} ${validErrors.budgetMin ? s.inputError : ''}`}
                    placeholder="Введите число"
                    value={budgetMin}
                    onChange={e => { setBudgetMin(e.target.value); clearErr('budgetMin'); }}
                  />
                  <span className={s.unit}>руб.</span>
                </div>
                {validErrors.budgetMin && <p className={s.fieldError}>⚠ {validErrors.budgetMin}</p>}
              </div>
              <div>
                <p className={s.subTitle}>
                  Максимальная стоимость <span style={{ color: '#c0392b' }}>*</span>
                </p>
                <div className={s.inputWithUnit}>
                  <input
                    className={`${s.input} ${validErrors.budgetMax ? s.inputError : ''}`}
                    placeholder="Введите число"
                    value={budgetMax}
                    onChange={e => { setBudgetMax(e.target.value); clearErr('budgetMax'); }}
                  />
                  <span className={s.unit}>руб.</span>
                </div>
                {validErrors.budgetMax && <p className={s.fieldError}>⚠ {validErrors.budgetMax}</p>}
              </div>
            </div>
              <hr className={s.divider} />

<h2 className={s.frameTitle}>
  Есть вся сумма целиком?
</h2>

<div className={s.financeGrid}>
  {cashOptions.map(item => (
    <label key={item} className={s.cbRow}>
      <input
        type="checkbox"
        checked={cashOptionsSelected.includes(item)}
        onChange={() =>
          toggle(
            cashOptionsSelected,
            setCashOptionsSelected,
            item
          )
        }
      />
      {item}
    </label>
  ))}
</div>

<h2 className={s.frameTitle}>
  Финансовые инструменты
</h2>

<div className={s.financeToolsGrid}>
  {financeOptions.map(item => (
    <label key={item} className={s.cbRow}>
      <input
        type="checkbox"
        checked={financeTools.includes(item)}
        onChange={() =>
          toggle(
            financeTools,
            setFinanceTools,
            item
          )
        }
      />
      {item}
    </label>
  ))}
</div>

<input
  className={s.input}
  placeholder="Введите комментарий"
  value={financeComment}
  onChange={(e) =>
    setFinanceComment(e.target.value)
  }
/>

<h2 className={s.frameTitle}>
  Удобный платеж по ипотеке/рассрочке
</h2>

<div className={s.paymentRow}>
  <input
    className={s.paymentInput}
    placeholder="Введите число"
    value={monthlyPayment}
    onChange={(e) =>
      setMonthlyPayment(e.target.value)
    }
  />

  <span>руб/мес.</span>
</div>

<h2 className={s.frameTitle}>
  Сроки
</h2>

<p className={s.subTitle}>
  Срок приобретения
</p>

<div className={s.purchaseGrid}>
  {purchaseOptions.map(item => (
    <label key={item} className={s.cbRow}>
      <input
        type="radio"
        name="purchaseTerm"
        checked={purchaseTerm === item}
        onChange={() =>
          setPurchaseTerm(item)
        }
      />
      {item}
    </label>
  ))}
</div>

<p className={s.hintText}>
  *Если вы планируете покупку в течение года
  и больше, рекомендуем заполнить анкету
  ближе к дате приобретения.
</p>

<p className={s.subTitle}>
  Срок сдачи объекта
</p>

<div className={s.floorRow}>
  <span className={s.floorLabel}>от</span>

  <input
    className={s.floorBox}
    value={completionYearFrom}
    onChange={(e) =>
      setCompletionYearFrom(
        Number(e.target.value)
      )
    }
  />

  <input
    type="range"
    min="2019"
    max="2040"
    value={completionYearFrom}
    className={s.slider}
    onChange={(e) =>
      setCompletionYearFrom(
        Number(e.target.value)
      )
    }
  />

  <input
    type="range"
    min="2019"
    max="2040"
    value={completionYearTo}
    className={s.slider}
    onChange={(e) =>
      setCompletionYearTo(
        Number(e.target.value)
      )
    }
  />

  <span className={s.floorLabel}>до</span>

  <input
    className={s.floorBox}
    value={completionYearTo}
    onChange={(e) =>
      setCompletionYearTo(
        Number(e.target.value)
      )
    }
  />
</div>
            {/* Статус */}
            {error   && <p className={s.msgError}>{error}</p>}
            {success && <p className={s.msgSuccess}>✓ Анкета успешно сохранена!</p>}

            {/* Кнопка */}
            <button
              className={s.saveBtn}
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? 'Сохраняем...' : 'Сохранить анкету'}
            </button>

          </div>

          {/* Кастомный скроллбар */}
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