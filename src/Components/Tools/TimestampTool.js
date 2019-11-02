import React, { useCallback, useEffect, useState } from "react";
import copyToClipBoard from "../../Utils/CopyToClipboard";
import { Metas } from "../Layout/Metas";
import DateTimePicker from "react-datetime-picker";
const TITLE = "Timestamp";
const DESCRIPTION =
  "Convert date to timestamp or a timestamp to a readable date.";

function convertToUtcDate(date) {
  return new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds()
    )
  );
}

function TimestampTool() {
  const [currentUtcDate, setCurrentUtcDate] = useState(new Date());
  const [customUtcDate, setCustomUtcDate] = useState(
    convertToUtcDate(new Date())
  );
  console.log({ newDate: new Date(), converter: convertToUtcDate(new Date()) });
  const [customLocaleDate, setCustomLocaleDate] = useState(new Date());
  const [invalidCustomTimestamp, setInvalidCustomTimestamp] = useState(false);
  const [invalidCustomUtcTimestamp, setInvalidCustomUtcTimestamp] = useState(
    false
  );

  const setCustomUtcDateFromUnixTimestamp = useCallback(event => {
    const customTimestamp = new Date(event.target.value * 1000);
    if (customTimestamp instanceof Date && !isNaN(customTimestamp)) {
      setCustomUtcDate(customTimestamp);
      setInvalidCustomTimestamp(false);
      return;
    }
    setInvalidCustomTimestamp(true);
  }, []);

  const setCustomDateFromJavascriptTimestamp = useCallback(event => {
    const customUtcTimestamp = new Date(event.target.value);
    if (customUtcTimestamp instanceof Date && !isNaN(customUtcTimestamp)) {
      setCustomUtcDate(convertToUtcDate(new Date(customUtcTimestamp)));
      setInvalidCustomUtcTimestamp(false);
      return;
    }
    setInvalidCustomUtcTimestamp(true);
  }, []);

  useEffect(() => {
    setInterval(() => {
      setCurrentUtcDate(new Date());
    }, 100);
  }, []);

  return (
    <>
      <Metas title={TITLE} description={DESCRIPTION} />
      <div className="header text-xs-center">
        <h1>{TITLE}</h1>
        <h2>{DESCRIPTION}</h2>
      </div>
      <div className="content">
        <table className="pure-table pure-table-horizontal">
          <thead>
            <tr>
              <th>Format</th>
              <th colSpan="2">Now</th>
              <th colSpan="2">Custom date</th>
            </tr>
            <tr>
              <th />
              <th>UTC</th>
              <th>Local Timezone</th>
              <th>UTC</th>
              <th>Local Timezone</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>String</td>
              <td>
                {currentUtcDate.toLocaleString(
                  navigator.language || navigator.userLanguage,
                  {
                    timeZone: "UTC"
                  }
                )}
              </td>
              <td>
                {currentUtcDate.toLocaleString(
                  navigator.language || navigator.userLanguage,
                  {
                    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
                  }
                )}
              </td>
              <td>
                <DateTimePicker
                  onChange={setCustomUtcDate}
                  value={customUtcDate}
                  disableClock
                  showLeadingZeros
                  clearIcon={null}
                  calendarIcon={null}
                  format={"y-MM-dd HH:mm:ss"}
                />
              </td>{" "}
              <td>
                <DateTimePicker
                  onChange={setCustomLocaleDate}
                  value={customLocaleDate}
                  disableClock
                  showLeadingZeros
                  clearIcon={null}
                  calendarIcon={null}
                  format={"y-MM-dd HH:mm:ss"}
                />
              </td>
            </tr>
            <tr>
              <td>Timestamp (Unix, in seconds)</td>
              <td>
                {Math.floor(convertToUtcDate(currentUtcDate) / 1000)}{" "}
                <button
                  className="pure-button"
                  title={"Copy to clipboard"}
                  onClick={() => {
                    copyToClipBoard(
                      Math.floor(currentUtcDate.getTime() / 1000)
                    );
                  }}
                >
                  <i className="fas fa-copy" />
                </button>
              </td>
              <td>
                {Math.floor(customLocaleDate.getTime() / 1000)}{" "}
                <button
                  className="pure-button"
                  title={"Copy to clipboard"}
                  onClick={() => {
                    copyToClipBoard(
                      Math.floor(currentUtcDate.getTime() / 1000)
                    );
                  }}
                >
                  <i className="fas fa-copy" />
                </button>
              </td>
              <td>
                <input
                  type="text"
                  value={Math.floor(customUtcDate.getTime() / 1000)}
                  onChange={setCustomUtcDateFromUnixTimestamp}
                  maxLength="10"
                />{" "}
                <button
                  className="pure-button"
                  title={"Copy to clipboard"}
                  onClick={() => {
                    copyToClipBoard(Math.floor(customUtcDate.getTime() / 1000));
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
              <td>Timestamp (Javascript, in milliseconds)</td>
              <td>
                {currentUtcDate.getTime()}{" "}
                <button
                  className="pure-button"
                  title={"Copy to clipboard"}
                  onClick={() => {
                    copyToClipBoard(currentUtcDate.getTime());
                  }}
                >
                  <i className="fas fa-copy" />
                </button>
              </td>
              <td>
                <input
                  type="text"
                  value={customUtcDate.getTime()}
                  onChange={setCustomDateFromJavascriptTimestamp}
                  maxLength="13"
                />{" "}
                <button
                  className="pure-button"
                  title={"Copy to clipboard"}
                  onClick={() => {
                    copyToClipBoard(customUtcDate.getTime());
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
