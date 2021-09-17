import React from "react";
import { useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

import "./Calendar.css";

function Calendar({ showWeekHandler, showMonthHandler }) {
  const [getMoment, setMoment] = useState(moment());
  const today = getMoment;
  const firstWeek = today.clone().startOf("month").week();
  const lastWeek =
    today.clone().endOf("month").week() === 1
      ? 53
      : today.clone().endOf("month").week();

  const calendarArr = () => {
    let result = [];

    for (let week = firstWeek; week <= lastWeek; week++) {
      result = result.concat(
        <tr key={week}>
          {Array(7)
            .fill(0)
            .map((data, index) => {
              let days = today
                .clone()
                .startOf("year")
                .week(week)
                .startOf("week")
                .add(index, "day");

              if (moment().format("YYYYMMDD") === days.format("YYYYMMDD")) {
                return (
                  <td key={index} className='cell today'>
                    <Link
                      className='eachDay-link'
                      to={`/calendar/${days.format("YYYYMMDD")}`}
                    >
                      <span className='day'>{days.format("D")}</span>
                    </Link>
                  </td>
                );
              } else if (days.format("MM") !== today.format("MM")) {
                return (
                  <td key={index} className='cell month'>
                    <Link
                      className='eachDay-link'
                      to={`/calendar/${days.format("YYYYMMDD")}`}
                    >
                      <span className='day'>{days.format("D")}</span>
                    </Link>
                  </td>
                );
              } else {
                return (
                  <td key={index} className='cell'>
                    <Link
                      className='eachDay-link'
                      to={`/calendar/${days.format("YYYYMMDD")}`}
                    >
                      <span className='day'>{days.format("D")}</span>
                    </Link>
                  </td>
                );
              }
            })}
        </tr>,
      );
    }
    return result;
  };

  return (
    <div id='body'>
      <div id='calendar-controler'>
        <button
          id='left'
          onClick={() => setMoment(getMoment.clone().subtract(1, "month"))}
        >
          <i className='far fa-caret-square-left'></i>
        </button>
        <span id='date'>{today.format("YYYY년 MM월")}</span>
        <button
          id='right'
          onClick={() => {
            setMoment(getMoment.clone().add(1, "month"));
          }}
        >
          <i className='far fa-caret-square-right'></i>
        </button>
        <button
          id='today'
          onClick={() => {
            setMoment(moment());
          }}
        >
          Today
        </button>
        <button id='week' onClick={showMonthHandler}>Month</button>
        <button id='week' onClick={showWeekHandler}>Week</button>
      </div>
      <div>
        <table id='calendar-table'>
          <thead>
            <tr>
              <td id='weekend'>SUN</td>
              <td id='thead'>MON</td>
              <td id='thead'>TUE</td>
              <td id='thead'>WED</td>
              <td id='thead'>THU</td>
              <td id='thead'>FRI</td>
              <td id='thead'>SAT</td>
            </tr>
          </thead>
          <tbody className='calendar-body'>{calendarArr()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Calendar;
