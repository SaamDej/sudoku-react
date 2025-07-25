import { RefObject, useEffect, useRef, useState } from "react";
import { formatTime } from "../utilities";

const useTime = (isPaused: boolean, startingTime: number) => {
  const [time, setTime] = useState(startingTime);
  const interval: RefObject<any> = useRef(0);
  useEffect(() => {
    if (!isPaused) {
      interval.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 10);
    }
    return () => {
      if (interval.current) {
        clearInterval(interval.current);
        interval.current = 0;
      }
    };
  }, [isPaused]);

  return formatTime(time);
};

export default useTime;
