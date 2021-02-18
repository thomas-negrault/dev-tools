import React, { useEffect, useState } from "react";
import { Metas } from "../../Layout/Metas";
import DateDetails from "./DateDetails";
import UserDateTimePicker from "./UserDateTimePicker";
import momentTZ from "moment-timezone";

const TITLE = "Unix epoch and timestamp converter";
const DESCRIPTION =
  "Display the current Unix epoch (or Unix time) and convert between dates and timestamps";

const LOCAL_STORAGE_USER_TIMEZONE_KEY = "custom_user_timezone";

function TimestampTool() {
  const [customTimeZone, setCustomTimezone] = useState(
    localStorage.getItem(LOCAL_STORAGE_USER_TIMEZONE_KEY) ?? momentTZ.tz.guess()
  );

  const onCustomTimezoneChange = (newCustomTimezone) => {
    setCustomTimezone(newCustomTimezone);
    localStorage.setItem(LOCAL_STORAGE_USER_TIMEZONE_KEY, newCustomTimezone);
  };

  const [currentDate, setCurrentDate] = useState(new Date());
  const [userDate, setUserDate] = useState(new Date());

  useEffect(() => {
    setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
  }, []);

  return (
    <>
      <Metas title={TITLE} description={DESCRIPTION} />
      <div className="py-4 text-center tool-header">
        <h1>{TITLE}</h1>
        <h2>{DESCRIPTION}</h2>
      </div>

      <div>
        <h3>Unix Epoch</h3>
        <p>
          The Unix epoch (also called Unix time) is the number of seconds since
          January 1st, 1970 00:00:00 UTC
        </p>
      </div>
      <DateDetails
        date={currentDate}
        customTimeZone={customTimeZone}
        onCustomTimezoneChange={onCustomTimezoneChange}
      />
      <hr />
      <div>
        <h3>Custom Date</h3>
        <p>
          The initial date value is generated when the page is loaded. You can
          set it to a custom date using the DateTime picker or by submitting a
          timestamp (either in millisecond or second from January 1st, 1970
          00:00:00 UTC)
        </p>
      </div>

      <UserDateTimePicker
        value={userDate}
        onChange={setUserDate}
        customTimeZone={customTimeZone}
      />
      <DateDetails
        date={userDate}
        customTimeZone={customTimeZone}
        onCustomTimezoneChange={onCustomTimezoneChange}
      />
    </>
  );
}

export default TimestampTool;
