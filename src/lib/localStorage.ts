export const getLocalStorage = <T>(key: string): T | null => {
  const item = localStorage.getItem(key);

  if (item) {
    return JSON.parse(item);
  }

  return null;
};

export const setLocalStorage = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export const clearLocalStorage = () => {
  localStorage.clear();
};
