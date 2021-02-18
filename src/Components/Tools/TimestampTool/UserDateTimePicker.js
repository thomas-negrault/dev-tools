import React, { useState } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

const isTimestampValid = (timestamp) => new Date(timestamp).getTime() > 0;

const renderInput = (props, openCalendar) => {
  return (
    <div>
      <button className="btn btn-outline-success" onClick={openCalendar}>
        <i className="fas fa-calendar"></i> Open Date picker
      </button>
    </div>
  );
};

const UserDateTimePicker = ({ value, onChange }) => {
  const [customTimestamp, setCustomTimestamp] = useState("");
  const [customDateError, setCustomDateError] = useState(false);
  const [isDateTimePickerUtc, setDateTimePickerUtc] = useState(false);

  const handleUtcDateTimePickerRadio = (e) => {
    setDateTimePickerUtc(e.target.value === "true");
  };

  return (
    <div>
      <div className={"p-3 row align-items-center"}>
        <input
          type="number"
          className="dark mx-2"
          value={customTimestamp}
          onChange={(e) => {
            setCustomTimestamp(e.target.value);
            setCustomDateError(false);
          }}
        />
        <button
          className="btn btn-outline-success mr-2  text-wrap"
          onClick={() => {
            const customIntTimestamp = parseInt(customTimestamp) * 1000;
            if (isTimestampValid(customIntTimestamp)) {
              onChange(new Date(customIntTimestamp));
            } else {
              setCustomDateError(true);
            }
          }}
        >
          Set timestamp (seconds)
        </button>
        <button
          className="btn btn-outline-success mr-2  text-wrap"
          onClick={() => {
            const customIntTimestamp = parseInt(customTimestamp);
            if (isTimestampValid(customIntTimestamp)) {
              onChange(new Date(customIntTimestamp));
            } else {
              setCustomDateError(true);
            }
          }}
        >
          Set timestamp (milliseconds)
        </button>
      </div>
      <div className={"p-3 row align-items-center"}>
        Datepicker timezone:
        <div className="form-check form-check-inline custom-control custom-radio ml-1">
          <input
            className="custom-control-input"
            type="radio"
            name="dateTimePickerTimezone"
            id="localDateTimePickerTimezone"
            checked={!isDateTimePickerUtc}
            value="false"
            onChange={handleUtcDateTimePickerRadio}
          />
          <label
            className="custom-control-label"
            htmlFor="localDateTimePickerTimezone"
          >
            Local
          </label>
        </div>
        <div className="form-check form-check-inline custom-control custom-radio">
          <input
            className="custom-control-input"
            type="radio"
            name="dateTimePickerTimezone"
            id="utcDateTimePicker"
            value="true"
            onChange={handleUtcDateTimePickerRadio}
            checked={isDateTimePickerUtc}
          />
          <label className="custom-control-label" htmlFor="utcDateTimePicker">
            UTC
          </label>
        </div>
        <Datetime
          className={"user-date-time-picker"}
          utc={isDateTimePickerUtc}
          renderInput={renderInput}
          value={value}
          onChange={(momentDate) => {
            onChange(momentDate.toDate());
            setCustomDateError(false);
          }}
        />
      </div>

      {customDateError && (
        <div className="bs-component py-4">
          <div className="alert alert-danger">Invalid timestamp</div>
        </div>
      )}
    </div>
  );
};

export default UserDateTimePicker;
