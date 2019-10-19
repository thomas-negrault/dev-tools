import React, { useCallback, useEffect, useState } from "react";
import copyToClipBoard from "../../Utils/CopyToClipboard";
import { Metas } from "../Layout/Metas";
import DateTimePicker from "react-datetime-picker";
const TITLE = "Timestamp";
const DESCRIPTION =
  "Convert date to timestamp or a timestamp to a readable date.";

function TimestampTool() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [customDate, setCustomDate] = useState(new Date());
  const [invalidCustomTimestamp, setInvalidCustomTimestamp] = useState(false);
  const [invalidCustomUtcTimestamp, setInvalidCustomUtcTimestamp] = useState(
    false
  );

  const setCustomDateFromTimestamp = useCallback(event => {
    const customTimestamp = new Date(event.target.value * 1000);
    if (customTimestamp instanceof Date && !isNaN(customTimestamp)) {
      setCustomDate(customTimestamp);
      setInvalidCustomTimestamp(false);
      return;
    }
    setInvalidCustomTimestamp(true);
  }, []);

  const setCustomDateFromUtcTimestamp = useCallback(event => {
    const customUtcTimestamp = new Date(event.target.value);
    if (customUtcTimestamp instanceof Date && !isNaN(customUtcTimestamp)) {
      setCustomDate(customUtcTimestamp);
      setInvalidCustomUtcTimestamp(false);
      return;
    }
    setInvalidCustomUtcTimestamp(true);
  }, []);

  useEffect(() => {
    setInterval(() => {
      setCurrentDate(new Date());
    }, 100);
  }, []);

  return (
    <>
      <Metas title={TITLE} description={DESCRIPTION} />
      <div className="header">
        <h1>{TITLE}</h1>
        <h2>{DESCRIPTION}</h2>
      </div>
      <div className="content">
        <table className="pure-table pure-table-horizontal">
          <thead>
            <tr>
              <th>Format</th>
              <th>Now</th>
              <th>Custom date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>String</td>
              <td>{currentDate.toLocaleString()}</td>
              <td>
                <DateTimePicker
                  onChange={setCustomDate}
                  value={customDate}
                  disableClock
                  showLeadingZeros
                  clearIcon={null}
                  calendarIcon={null}
                  format={"y-MM-dd HH:mm:ss"}
                />
              </td>
            </tr>
            <tr>
              <td>Timestamp UTC</td>
              <td>
                {Math.floor(currentDate.getTime() / 1000)}{" "}
                <button
                  className="pure-button"
                  title={"Copy to clipboard"}
                  onClick={() => {
                    copyToClipBoard(Math.floor(currentDate.getTime() / 1000));
                  }}
                >
                  <i className="fas fa-copy" />
                </button>
              </td>
              <td>
                <input
                  type="text"
                  value={Math.floor(customDate.getTime() / 1000)}
                  onChange={setCustomDateFromTimestamp}
                  maxLength="10"
                />{" "}
                <button
                  className="pure-button"
                  title={"Copy to clipboard"}
                  onClick={() => {
                    copyToClipBoard(Math.floor(customDate.getTime() / 1000));
                  }}
                >
                  <i className="fas fa-copy" />
                </button>
                {invalidCustomTimestamp && (
                  <i
                    className="fas fa-exclamation-triangle"
                    title={"Invalid timestamp"}
                  />
                )}
              </td>
            </tr>
            <tr>
              <td>Timestamp</td>
              <td>
                {currentDate.getTime()}{" "}
                <button
                  className="pure-button"
                  title={"Copy to clipboard"}
                  onClick={() => {
                    copyToClipBoard(currentDate.getTime());
                  }}
                >
                  <i className="fas fa-copy" />
                </button>
              </td>
              <td>
                <input
                  type="text"
                  value={customDate.getTime()}
                  onChange={setCustomDateFromUtcTimestamp}
                  maxLength="13"
                />{" "}
                <button
                  className="pure-button"
                  title={"Copy to clipboard"}
                  onClick={() => {
                    copyToClipBoard(customDate.getTime());
                  }}
                >
                  <i className="fas fa-copy" />
                </button>
                {invalidCustomUtcTimestamp && (
                  <i
                    className="fas fa-exclamation-triangle"
                    title={"Invalid timestamp"}
                  />
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TimestampTool;
