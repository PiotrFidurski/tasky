import { useEffect, useRef } from 'react';

export function useInputFocusOnMount<T extends HTMLElement>() {
  const inputRef = useRef<T | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return inputRef;
}
