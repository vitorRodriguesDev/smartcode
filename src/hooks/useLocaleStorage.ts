import { useState, useEffect } from 'react';

const PREFIX = 'online-code-editor-';

const useLocaleStorage = (key: string, initialValue: any) => {
  const prefixedKey = PREFIX.concat(key);

  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey);

    if (jsonValue != null) return JSON.parse(jsonValue);

    if (typeof initialValue === 'function') return initialValue();

    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  return [value, setValue];
};

export default useLocaleStorage;
