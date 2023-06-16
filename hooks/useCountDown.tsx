import { useEffect, useState } from "react";

const useCountDown = (minutes: number) => {
  const milliseconds = minutes * 60 * 1000;

  const [millisecondsRemaining, setMillisecondsRemaining] =
    useState(milliseconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setMillisecondsRemaining((prev) => prev - 1000);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return getReturnValues(millisecondsRemaining);
};

const getReturnValues = (countDown: number) => {
  const hours = Math.floor(countDown / (1000 * 60 * 60));
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return { hours, minutes, seconds };
};

export default useCountDown;
