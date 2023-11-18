// /src/lib/localStorageUtils.ts
"use client"
// Function to get data from local storage
export const getLocalStorage = (key: string) => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
};

// Function to set data in local storage
export const setLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
};
