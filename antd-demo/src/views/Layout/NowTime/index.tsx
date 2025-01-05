import React, { useState, useEffect } from "react";
import { Statistic } from "antd";
import moment from "moment";

function Clock() {
  const [currentTime, setCurrentTime] = useState(moment());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <Statistic
        style={{
          fontWeight: "bold",
          width: '110px'
        }}
        value={currentTime.format("HH:mm:ss")}
      />
    </>
  );
}

export default Clock;
