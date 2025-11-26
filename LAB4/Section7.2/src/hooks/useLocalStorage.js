import { useState } from "react";

export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (newValue) => {
    setStoredValue(newValue);
    window.localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [storedValue, setValue];
}
    