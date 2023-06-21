import { useEffect, useState } from "react";

const useCountDown = (initialMinutes: number) => {
  const timeInMilliseconds = initialMinutes * 60 * 1000;

  const [timeRemaining, setTimeRemaining] = useState(timeInMilliseconds);

  const increaseTimerBy = (minutes: number) =>
    setTimeRemaining((prev) => prev + minutes * 60 * 1000);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prev) => prev - 1000);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Calculate time remaining in largest-to-smallest increments
  const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  return { hours, minutes, seconds, increaseTimerBy, total: timeRemaining };
};

export default useCountDown;
