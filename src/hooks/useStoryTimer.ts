import { useEffect, useRef, useState, useCallback } from 'react';

interface UseStoryTimerProps {
  onTimeComplete: () => void;
  duration?: number;
  isActive: boolean;
}

export const useStoryTimer = ({
  onTimeComplete,
  duration = 3000,
  isActive,
}: UseStoryTimerProps) => {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isPausedRef = useRef(false);
  const startTimeRef = useRef<number>(0);
  const elapsedTimeRef = useRef<number>(0);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    if (!isActive || isPausedRef.current) return;

    clearTimer();
    startTimeRef.current = Date.now();
    const frameTime = 30; // ms per frame

    intervalRef.current = setInterval(() => {
      const currentTime = Date.now();
      const totalElapsed = elapsedTimeRef.current + (currentTime - startTimeRef.current);
      const newProgress = (totalElapsed / duration) * 100;

      if (newProgress >= 100) {
        setProgress(100);
        clearTimer();
        elapsedTimeRef.current = 0;
        onTimeComplete();
      } else {
        setProgress(newProgress);
      }
    }, frameTime);
  }, [clearTimer, duration, isActive, onTimeComplete]);

  const pause = useCallback(() => {
    isPausedRef.current = true;
    if (startTimeRef.current) {
      elapsedTimeRef.current += Date.now() - startTimeRef.current;
    }
    clearTimer();
  }, [clearTimer]);

  const resume = useCallback(() => {
    isPausedRef.current = false;
    startTimer();
  }, [startTimer]);

  const reset = useCallback(() => {
    setProgress(0);
    elapsedTimeRef.current = 0;
    isPausedRef.current = false;
    startTimer();
  }, [startTimer]);

  useEffect(() => {
    startTimer();
    return clearTimer;
  }, [startTimer, clearTimer]);

  return {
    progress,
    pause,
    resume,
    reset,
  };
};
