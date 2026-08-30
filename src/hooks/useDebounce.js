import { useState, useEffect } from 'react';

/**
 * Custom hook to debounce any fast-changing value (e.g. search input).
 * @param {any} value - The input value to debounce
 * @param {number} delayMs - Delay in milliseconds (default: 280ms)
 * @returns {any} debouncedValue
 */
export function useDebounce(value, delayMs = 280) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delayMs]);

  return debouncedValue;
}
