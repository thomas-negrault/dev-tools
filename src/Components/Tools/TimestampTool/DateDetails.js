import React, { useState } from "react";
import ClipBoardCopyBtn from "../../common/ClipboardCopyBtn";
import momentTZ from "moment-timezone";
const timeZonesList = momentTZ.tz.names();

const DateDetails = ({ date, customTimeZone, onCustomTimezoneChange }) => {
  const utcMillisecondsSinceEpoch = date.getTime();
  const utcSecondsSinceEpoch = Math.round(utcMillisecondsSinceEpoch / 1000);

  return (
    <table className="table">
      <tbody>
        <tr>
          <td>
            <strong>Epoch (seconds)</strong>
          </td>
          <td>
            <input
              type="number"
              className="dark mr-2"
              value={utcSecondsSinceEpoch}
              disabled
            />
            <ClipBoardCopyBtn text={utcSecondsSinceEpoch} />
          </td>
        </tr>
        <tr>
          <td>
            <strong>Epoch (milliseconds)</strong>
          </td>
          <td>
            <input
              type="number"
              className="dark mr-2"
              value={utcMillisecondsSinceEpoch}
              disabled
            />
            <ClipBoardCopyBtn text={utcMillisecondsSinceEpoch} />
          </td>
        </tr>
        <tr>
          <td>
            <strong>UTC Date</strong>
          </td>
          <td>{date.toUTCString()}</td>
        </tr>
        <tr>
          <td>
            <strong>Local Date</strong>
          </td>
          <td>{date.toString()}</td>
        </tr>

        <tr>
          <td>
            <a href={"https://en.wikipedia.org/wiki/ISO_8601"}>ISO 8601</a>
          </td>
          <td>{date.toISOString()}</td>
        </tr>
        <tr>
          <td>
            <select
              className="form-select dark"
              value={customTimeZone}
              onChange={(e) => {
                onCustomTimezoneChange(e.target.value);
              }}
            >
              {timeZonesList.map((timezone) => {
                return (
                  <option value={timezone} key={timezone}>
                    {timezone}
                  </option>
                );
              })}
            </select>
          </td>
          <td>{date.toLocaleString([], { timeZone: customTimeZone })}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default DateDetails;
