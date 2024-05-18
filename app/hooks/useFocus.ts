import { useCallback, useRef } from 'react';

export const useFocus = () => {
  const ref = useRef<HTMLInputElement>(null);

  const focusElement = useCallback(() => {
    if (ref?.current) {
      ref.current.focus();
    }
  }, []);

  return [ref, focusElement];
};
