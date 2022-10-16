import React, { useState } from "react";
import { AtoB, BtoA } from "./data";
import jstz from "jstz";

const timezone = () => {
  const timezone = jstz.determine();
  return timezone.name();
};

function App() {
  const [direction, setDirection] = useState("");
  const [timeto, setTimeto] = useState("");
  const [timefrom, setTimefrom] = useState("");
  const [count, setCount] = useState(0);
  const [calc, setCalc] = useState(false);

  function calculate() {
    switch (direction) {
      case "из А в В":
        return count * 700;
      case "из В в А":
        return count * 700;
      case "из А в В и обратно в А":
        return count * 1200;
    }
  }
  function calculateTime() {
    switch (direction) {
      case "из А в В":
        return 50;
      case "из А в В и обратно в А":
        return 50;
      case "из В в А":
        return 50;
    }
  }
  function calculateTimer(timeStr) {
    const timeArr = timeStr.split(":");
    const min = +timeArr[0] * 60 + +timeArr[1] + 50;
    const mm = min % 60;
    const hh = (min - mm) / 60;
    return `${hh}:${mm < 10 ? "0".concat(mm) : mm}`;
  }
  return (
    <div className="App">
      <div>
        <label className="lead">Выберите направление:</label>
        <select
          className="form-select-sm"
          name="route"
          id="route"
          defaultValue={"DEFAULT"}
          onChange={(event) => {
            setDirection(event.target.value);
            setCalc(false);
          }}
        >
          <option hidden value="DEFAULT" disabled></option>
          <option value="из А в В">из A в B</option>
          <option value="из В в А">из B в A</option>
          <option value="из А в В и обратно в А">из A в B и обратно в А</option>
        </select>
      </div>
      {direction ? (
        <div>
          <label className="lead">Выберите время туда:</label>
          <select
            className="form-select-sm"
            name="time"
            defaultValue={"DEFAULT"}
            id="time"
            onChange={(event) => {
              setTimeto(event.target.value);
              setCalc(false);
            }}
          >
            <option hidden value="DEFAULT" disabled></option>
            {direction === "из А в В"
              ? AtoB.map((item, index) => (
                  <option key={index}>
                    {new Date(item).toLocaleString("ru-RU", {
                      timeZone: timezone(),
                    })}
                  </option>
                ))
              : direction === "из В в А"
              ? BtoA.map((item, index) => (
                  <option key={index}>
                    {new Date(item).toLocaleString("ru-RU", {
                      timeZone: timezone(),
                    })}
                  </option>
                ))
              : direction === "из А в В и обратно в А"
              ? AtoB.map((item, index) => {
                  return (
                    <option key={index}>
                      {new Date(item).toLocaleString("ru-RU", {
                        timeZone: timezone(),
                      })}
                    </option>
                  );
                })
              : null}
          </select>
        </div>
      ) : null}
      {timeto && direction === "из А в В и обратно в А" ? (
        <div>
          <label className="lead">Выберите время обратно:</label>
          <select
            className="form-select-sm"
            defaultValue={"DEFAULT"}
            name="time"
            id="time"
            onChange={(event) => {
              setTimefrom(event.target.value);
              setCalc(false);
            }}
          >
            <option hidden value="DEFAULT" disabled></option>
            {BtoA.map((item, index) => {
              return (
                <option key={index}>
                  {new Date(item).toLocaleString("ru-RU", {
                    timeZone: timezone(),
                  })}
                </option>
              );
            })}
          </select>
        </div>
      ) : null}
      <div>
        <label className="lead">Количество билетов:</label>
        <input
          className="form-control-sm"
          id="num"
          value={count}
          onChange={(event) => {
            setCount(event.target.value);
            setCalc(false);
          }}
        />
      </div>
      <div>
        <button
          className="btn btn-success"
          onClick={() => {
            setCalc(true);
          }}
        >
          Посчитать
        </button>
      </div>
      {calc ? (
        <div className="blockquote">
          {direction === "из А в В и обратно в А"
            ? `Вы выбрали ${count} билета по маршруту ${direction} стоимостью ${calculate()}р.
        Это путешествие займет у вас ${calculateTime()} минут в пункт В и ${calculateTime()} минут обратно в А. 
        Теплоход отправляется в пункт В в ${timeto.slice(
          12,
          17
        )}, прибудет туда в ${calculateTimer(
                timeto.slice(12, 17)
              )}. В ${timefrom.slice(
                12,
                17
              )} телоход отправляется из В, в ${timefrom.slice(
                12,
                17
              )}. и прибывает в пункт А в ${calculateTimer(
                timefrom.slice(12, 17)
              )}`
            : `Вы выбрали ${count} билета по маршруту из ${direction} стоимостью ${calculate()}р.
Это путешествие займет у вас ${calculateTime()} минут. 
Теплоход отправляется в ${timeto.slice(12, 17)}, а прибудет в ${calculateTimer(
                timeto.slice(12, 17)
              )}.`}
        </div>
      ) : null}
    </div>
  );
}

export default App;
