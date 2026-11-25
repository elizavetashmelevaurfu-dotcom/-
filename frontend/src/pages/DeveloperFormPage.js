import { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import s from './DeveloperFormPage.module.css';
import { saveMyJK } from '../api/storage';

export default function DeveloperFormPage({
  onBack,
  onLogoClick,
  onGoMyJK,
  onGoAnkety,
  onGoLeads,
}) {
  
  const scrollRef = useRef(null);
  const [thumbPct, setThumbPct] = useState(0);

  const [complexName, setComplexName] = useState('');

  const [cityInput, setCityInput] = useState('');
  const [metroInput, setMetroInput] = useState('');
  const [districtInput, setDistrictInput] = useState('');

  const [cities, setCities] = useState([]);
  const [metros, setMetros] = useState([]);
  const [districts, setDistricts] = useState([]);

  const [apartmentTypes, setApartmentTypes] =
    useState([]);

  const [euroFormat, setEuroFormat] =
    useState(false);

  const [euroTypes, setEuroTypes] =
    useState([]);

  const [areaMin, setAreaMin] = useState('');
  const [areaMax, setAreaMax] = useState('');

  const [floorMin, setFloorMin] =
    useState(1);

  const [floorMax, setFloorMax] =
    useState(53);

  const [finishes, setFinishes] =
    useState([]);

  const [financeTools, setFinanceTools] =
    useState([]);

  const [completionYearFrom,
    setCompletionYearFrom] =
    useState(2025);

  const [completionYearTo,
    setCompletionYearTo] =
    useState(2035);

  const [promotionEnabled,
    setPromotionEnabled] =
    useState(false);

  const [promotionTitle,
    setPromotionTitle] =
    useState('');

  const [promotionDescription,
    setPromotionDescription] =
    useState('');

  const [renderFile,
    setRenderFile] =
    useState(null);

  const [presentationFile,
    setPresentationFile] =
    useState(null);

  const apartmentOptions = [
    'Студия',
    '1к квартира',
    '2к квартира',
    '3к квартира',
    '4к квартира',
    '> 4 комнат',
    'Пентхаус',
  ];

  const euroOptions = [
    'Евро 1к',
    'Евро 2к',
    'Евро 3к',
    'Евро 4к',
    'Евро > 4 комнат',
  ];

  const finishOptions = [
    'Без отделки',
    'Черновая',
    'Предчистовая',
    'Чистовая',
    'С ремонтом',
    'С отделкой и мебелью',
  ];

  const financeOptions = [
    'Ипотека',
    'Рассрочка',
    'Обмен квартиры',
    'ИТ-ипотека',
    'Военная ипотека',
    'Семейная ипотека',
    'ДВ ипотека',
  ];

  useEffect(() => {
    const el = scrollRef.current;

    if (!el) return;

    const onScroll = () => {
      const ratio =
        el.scrollTop /
        (el.scrollHeight - el.clientHeight);

      setThumbPct(
        Math.min(
          82,
          Math.max(0, ratio * 82)
        )
      );
    };

    el.addEventListener(
      'scroll',
      onScroll
    );

    return () =>
      el.removeEventListener(
        'scroll',
        onScroll
      );
  }, []);

  const toggle = (
    list,
    setList,
    value
  ) => {
    setList(prev =>
      prev.includes(value)
        ? prev.filter(x => x !== value)
        : [...prev, value]
    );
  };

  const addTag = (
    value,
    setValue,
    list,
    setList
  ) => {
    const v = value.trim();

    if (
      v &&
      !list.includes(v)
    ) {
      setList([...list, v]);
    }

    setValue('');
  };

  const removeTag = (
    value,
    list,
    setList
  ) => {
    setList(
      list.filter(
        item => item !== value
      )
    );
  };

  const saveForm = () => {
    console.log({
      complexName,
      cities,
      metros,
      districts,
      apartmentTypes,
      euroFormat,
      euroTypes,
      areaMin,
      areaMax,
      floorMin,
      floorMax,
      finishes,
      financeTools,
      completionYearFrom,
      completionYearTo,
      promotionEnabled,
      promotionTitle,
      promotionDescription,
      renderFile,
      presentationFile,
    });
  };
  const handleSubmit = () => {
  saveMyJK({
    complexName: complexName,
    city:        cities[0]   || 'г. Екатеринбург',
    delivery:    `${completionYearFrom}–${completionYearTo}`,
    aptType:     apartmentTypes[0] || '',
    area:        areaMin ? `${areaMin}–${areaMax} м²` : '',
    price:       '',
  });
  alert('ЖК сохранён!');
};

  return (
    <div className={s.page}>
      <Navbar
        onLogoClick={
          onLogoClick
        }
        onGoMyJK={onGoMyJK}
        onGoAnkety={onGoAnkety}
        onGoLeads={onGoLeads}
      />

      <div className={s.inner}>

        <div
          className={s.headerRow}
        >
          <h1
            className={
              s.pageTitle
            }
          >
            ЖК
          </h1>

          <button
            className={
              s.topSaveBtn
            }
            onClick={handleSubmit}
          >
            Сохранить изменения
          </button>
        </div>

        <div
          className={s.modalWrap}
        >
          <div
            className={s.modal}
            ref={scrollRef}
          >
            <button
              className={
                s.closeBtn
              }
              onClick={onBack}
            >
              ×
            </button>

            <p
              className={
                s.subTitle
              }
            >
              Название ЖК
            </p>

            <input
              className={
                s.input
              }
              placeholder="Введите название ЖК"
              value={
                complexName
              }
              onChange={e =>
                setComplexName(
                  e.target.value
                )
              }
            />

            <hr
              className={
                s.divider
              }
            />

            <h3
              className={
                s.sectionTitle
              }
            >
              Локация
            </h3>

            <div
              className={s.locRow}
            >
              <div>
                <p
                  className={
                    s.subTitle
                  }
                >
                  Город
                </p>

                <input
                  className={
                    s.input
                  }
                  placeholder="Введите город и нажмите Enter"
                  value={cityInput}
                  onChange={e =>
                    setCityInput(
                      e.target.value
                    )
                  }
                  onKeyDown={e => {
                    if (
                      e.key ===
                      'Enter'
                    ) {
                      addTag(
                        cityInput,
                        setCityInput,
                        cities,
                        setCities
                      );
                    }
                  }}
                />

                <div
                  className={
                    s.tagsRow
                  }
                >
                  {cities.map(
                    city => (
                      <span
                        key={city}
                        className={
                          s.tag
                        }
                        onClick={() =>
                          removeTag(
                            city,
                            cities,
                            setCities
                          )
                        }
                      >
                        {city} ×
                      </span>
                    )
                  )}
                </div>
              </div>
                            <div>
                <p
                  className={
                    s.subTitle
                  }
                >
                  Метро
                </p>

                <input
                  className={
                    s.input
                  }
                  placeholder="Введите метро и нажмите Enter"
                  value={metroInput}
                  onChange={e =>
                    setMetroInput(
                      e.target.value
                    )
                  }
                  onKeyDown={e => {
                    if (
                      e.key ===
                      'Enter'
                    ) {
                      addTag(
                        metroInput,
                        setMetroInput,
                        metros,
                        setMetros
                      );
                    }
                  }}
                />

                <div
                  className={
                    s.tagsRow
                  }
                >
                  {metros.map(
                    metro => (
                      <span
                        key={metro}
                        className={
                          s.tag
                        }
                        onClick={() =>
                          removeTag(
                            metro,
                            metros,
                            setMetros
                          )
                        }
                      >
                        {metro} ×
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>

            <div
              className={s.locRow}
            >
              <div>
                <p
                  className={
                    s.subTitle
                  }
                >
                  Район
                </p>

                <input
                  className={
                    s.input
                  }
                  placeholder="Введите район и нажмите Enter"
                  value={
                    districtInput
                  }
                  onChange={e =>
                    setDistrictInput(
                      e.target.value
                    )
                  }
                  onKeyDown={e => {
                    if (
                      e.key ===
                      'Enter'
                    ) {
                      addTag(
                        districtInput,
                        setDistrictInput,
                        districts,
                        setDistricts
                      );
                    }
                  }}
                />

                <div
                  className={
                    s.tagsRow
                  }
                >
                  {districts.map(
                    district => (
                      <span
                        key={
                          district
                        }
                        className={
                          s.tag
                        }
                        onClick={() =>
                          removeTag(
                            district,
                            districts,
                            setDistricts
                          )
                        }
                      >
                        {district} ×
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>

            <hr
              className={
                s.divider
              }
            />

            <h3
              className={
                s.sectionTitle
              }
            >
              Параметры квартир
            </h3>

            <p
              className={
                s.subTitle
              }
            >
              Тип квартир в ЖК
            </p>

            <div
              className={
                s.cbGrid4
              }
            >
              {apartmentOptions.map(
                item => (
                  <label
                    key={item}
                    className={
                      s.cbRow
                    }
                  >
                    <input
                      type="checkbox"
                      checked={apartmentTypes.includes(
                        item
                      )}
                      onChange={() =>
                        toggle(
                          apartmentTypes,
                          setApartmentTypes,
                          item
                        )
                      }
                    />
                    {item}
                  </label>
                )
              )}
            </div>

            <div
              className={
                s.toggleRow
              }
            >
              Евро-формат квартир

              <div
                className={`${s.toggle}
                ${
                  euroFormat
                    ? s.toggleOn
                    : s.toggleOff
                }`}
                onClick={() =>
                  setEuroFormat(
                    !euroFormat
                  )
                }
              >
                <div
                  className={`${s.toggleKnob}
                  ${
                    euroFormat
                      ? s.toggleKnobOn
                      : s.toggleKnobOff
                  }`}
                />
              </div>
            </div>

            {euroFormat && (
              <div
                className={
                  s.cbGrid3
                }
              >
                {euroOptions.map(
                  item => (
                    <label
                      key={item}
                      className={
                        s.cbRow
                      }
                    >
                      <input
                        type="checkbox"
                        checked={euroTypes.includes(
                          item
                        )}
                        onChange={() =>
                          toggle(
                            euroTypes,
                            setEuroTypes,
                            item
                          )
                        }
                      />
                      {item}
                    </label>
                  )
                )}
              </div>
            )}

            <div
              className={
                s.twoCol
              }
            >
              <div>
                <p
                  className={
                    s.subTitle
                  }
                >
                  Минимальная площадь
                </p>

                <div
                  className={
                    s.inputWithUnit
                  }
                >
                  <input
                    className={
                      s.input
                    }
                    value={
                      areaMin
                    }
                    onChange={e =>
                      setAreaMin(
                        e.target.value
                      )
                    }
                  />

                  <span
                    className={
                      s.unit
                    }
                  >
                    кв.м
                  </span>
                </div>
              </div>

              <div>
                <p
                  className={
                    s.subTitle
                  }
                >
                  Максимальная площадь
                </p>

                <div
                  className={
                    s.inputWithUnit
                  }
                >
                  <input
                    className={
                      s.input
                    }
                    value={
                      areaMax
                    }
                    onChange={e =>
                      setAreaMax(
                        e.target.value
                      )
                    }
                  />

                  <span
                    className={
                      s.unit
                    }
                  >
                    кв.м
                  </span>
                </div>
              </div>
            </div>

            <p
              className={
                s.subTitle
              }
            >
              Этаж
            </p>

            <div
              className={
                s.floorRow
              }
            >
              <span
                className={
                  s.floorLabel
                }
              >
                от
              </span>

              <input
                className={
                  s.floorBox
                }
                value={
                  floorMin
                }
                onChange={e =>
                  setFloorMin(
                    Number(
                      e.target.value
                    )
                  )
                }
              />

              <input
                type="range"
                min="1"
                max="53"
                className={
                  s.slider
                }
                value={
                  floorMin
                }
                onChange={e =>
                  setFloorMin(
                    Number(
                      e.target.value
                    )
                  )
                }
              />

              <input
                type="range"
                min="1"
                max="53"
                className={
                  s.slider
                }
                value={
                  floorMax
                }
                onChange={e =>
                  setFloorMax(
                    Number(
                      e.target.value
                    )
                  )
                }
              />

              <span
                className={
                  s.floorLabel
                }
              >
                до
              </span>

              <input
                className={
                  s.floorBox
                }
                value={
                  floorMax
                }
                onChange={e =>
                  setFloorMax(
                    Number(
                      e.target.value
                    )
                  )
                }
              />
            </div>
                        <p
              className={
                s.subTitle
              }
            >
              Вид отделки
            </p>

            <div
              className={
                s.cbGrid3
              }
            >
              {finishOptions.map(
                item => (
                  <label
                    key={item}
                    className={
                      s.cbRow
                    }
                  >
                    <input
                      type="checkbox"
                      checked={finishes.includes(
                        item
                      )}
                      onChange={() =>
                        toggle(
                          finishes,
                          setFinishes,
                          item
                        )
                      }
                    />
                    {item}
                  </label>
                )
              )}
            </div>

            <hr
              className={
                s.divider
              }
            />

            <h3
              className={
                s.sectionTitle
              }
            >
              Финансовые инструменты
            </h3>

            <div
              className={
                s.financeToolsGrid
              }
            >
              {financeOptions.map(
                item => (
                  <label
                    key={item}
                    className={
                      s.cbRow
                    }
                  >
                    <input
                      type="checkbox"
                      checked={financeTools.includes(
                        item
                      )}
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
                )
              )}
            </div>

            <hr
              className={
                s.divider
              }
            />

            <h3
              className={
                s.sectionTitle
              }
            >
              Срок сдачи объекта
            </h3>

            <div
              className={
                s.floorRow
              }
            >
              <span
                className={
                  s.floorLabel
                }
              >
                от
              </span>

              <input
                className={
                  s.floorBox
                }
                value={
                  completionYearFrom
                }
                onChange={e =>
                  setCompletionYearFrom(
                    Number(
                      e.target.value
                    )
                  )
                }
              />

              <input
                type="range"
                min="2020"
                max="2045"
                value={
                  completionYearFrom
                }
                className={
                  s.slider
                }
                onChange={e =>
                  setCompletionYearFrom(
                    Number(
                      e.target.value
                    )
                  )
                }
              />

              <input
                type="range"
                min="2020"
                max="2045"
                value={
                  completionYearTo
                }
                className={
                  s.slider
                }
                onChange={e =>
                  setCompletionYearTo(
                    Number(
                      e.target.value
                    )
                  )
                }
              />

              <span
                className={
                  s.floorLabel
                }
              >
                до
              </span>

              <input
                className={
                  s.floorBox
                }
                value={
                  completionYearTo
                }
                onChange={e =>
                  setCompletionYearTo(
                    Number(
                      e.target.value
                    )
                  )
                }
              />
            </div>

            <hr
              className={
                s.divider
              }
            />

            <h3
              className={
                s.sectionTitle
              }
            >
              Материалы
            </h3>

            <p
              className={
                s.subTitle
              }
            >
              Рендер ЖК
            </p>

            <div
              className={
                s.uploadRow
              }
            >
              <input
                type="file"
                id="renderFile"
                hidden
                onChange={e =>
                  setRenderFile(
                    e.target.files?.[0]
                  )
                }
              />

              <label
                htmlFor="renderFile"
                className={
                  s.uploadBtn
                }
              >
                Загрузить
              </label>

              <button
                type="button"
                className={
                  s.deleteBtn
                }
                onClick={() =>
                  setRenderFile(
                    null
                  )
                }
              >
                Удалить
              </button>
            </div>

            {renderFile && (
              <div
                className={
                  s.fileName
                }
              >
                {renderFile.name}
              </div>
            )}

            <p
              className={
                s.subTitle
              }
            >
              Презентация объекта
            </p>

            <div
              className={
                s.uploadRow
              }
            >
              <input
                type="file"
                id="presentationFile"
                hidden
                onChange={e =>
                  setPresentationFile(
                    e.target.files?.[0]
                  )
                }
              />

              <label
                htmlFor="presentationFile"
                className={
                  s.uploadBtn
                }
              >
                Загрузить
              </label>

              <button
                type="button"
                className={
                  s.deleteBtn
                }
                onClick={() =>
                  setPresentationFile(
                    null
                  )
                }
              >
                Удалить
              </button>
            </div>

            {presentationFile && (
              <div
                className={
                  s.fileName
                }
              >
                {
                  presentationFile.name
                }
              </div>
            )}

            <hr
              className={
                s.divider
              }
            />

            <div
              className={
                s.toggleRow
              }
            >
              Акция

              <div
                className={`${s.toggle}
                ${
                  promotionEnabled
                    ? s.toggleOn
                    : s.toggleOff
                }`}
                onClick={() =>
                  setPromotionEnabled(
                    !promotionEnabled
                  )
                }
              >
                <div
                  className={`${s.toggleKnob}
                  ${
                    promotionEnabled
                      ? s.toggleKnobOn
                      : s.toggleKnobOff
                  }`}
                />
              </div>
            </div>

            {promotionEnabled && (
              <>
                <p
                  className={
                    s.subTitle
                  }
                >
                  Название акции
                </p>

                <input
                  className={
                    s.input
                  }
                  value={
                    promotionTitle
                  }
                  onChange={e =>
                    setPromotionTitle(
                      e.target.value
                    )
                  }
                  placeholder="Введите название акции"
                />

                <p
                  className={
                    s.subTitle
                  }
                >
                  Описание акции
                </p>

                <textarea
                  className={
                    s.textarea
                  }
                  value={
                    promotionDescription
                  }
                  onChange={e =>
                    setPromotionDescription(
                      e.target.value
                    )
                  }
                  placeholder="Введите описание акции"
                />
              </>
            )}

            <button
              className={
                s.saveBtn
              }
              onClick={
                saveForm
              }
            >
              Сохранить ЖК
            </button>

          </div>

          <div
            className={
              s.scrollbarCol
            }
          >
            <div
              className={
                s.sbTrack
              }
            >
              <div
                className={
                  s.sbThumb
                }
                style={{
                  top:
                    `${thumbPct}%`,
                }}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}