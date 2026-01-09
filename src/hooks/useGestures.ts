import { useRef, useCallback } from 'react';

interface UseGesturesProps {
  onTapLeft: () => void;
  onTapRight: () => void;
  onSwipeDown: () => void;
  onPause: () => void;
  onResume: () => void;
}

export const useGestures = ({
  onTapLeft,
  onTapRight,
  onSwipeDown,
  onPause,
  onResume,
}: UseGesturesProps) => {
  const touchStartRef = useRef({ x: 0, y: 0, time: 0 });
  const holdTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isPressedRef = useRef(false);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      const touch = e.touches[0];
      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now(),
      };
      isPressedRef.current = true;

      // Inicia pausa después de 500ms de hold
      holdTimeoutRef.current = setTimeout(() => {
        if (isPressedRef.current) {
          onPause();
        }
      }, 500);
    },
    [onPause]
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (holdTimeoutRef.current) {
        clearTimeout(holdTimeoutRef.current);
      }

      const touch = e.changedTouches[0];
      const endX = touch.clientX;
      const endY = touch.clientY;
      const endTime = Date.now();

      const deltaX = endX - touchStartRef.current.x;
      const deltaY = endY - touchStartRef.current.y;
      const timeDelta = endTime - touchStartRef.current.time;

      const isHold = timeDelta > 500;

      if (isHold && isPressedRef.current) {
        onResume();
        isPressedRef.current = false;
        return;
      }

      // Detectar swipe down (mínimo 50px hacia abajo)
      if (deltaY > 50 && Math.abs(deltaX) < 50) {
        onSwipeDown();
        isPressedRef.current = false;
        return;
      }

      // Detectar tap (menos de 300ms)
      if (timeDelta < 300) {
        const screenWidth = window.innerWidth;
        // Tap en izquierda (primer tercio)
        if (endX < screenWidth / 3) {
          onTapLeft();
        }
        // Tap en derecha (último tercio)
        else if (endX > (screenWidth * 2) / 3) {
          onTapRight();
        }
      }

      isPressedRef.current = false;
    },
    [onTapLeft, onTapRight, onSwipeDown, onPause, onResume]
  );

  return {
    handleTouchStart,
    handleTouchEnd,
  };
};

