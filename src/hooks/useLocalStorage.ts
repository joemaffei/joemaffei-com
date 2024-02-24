// "use client";

// import * as React from "react";

// const getLocalStorageItem = (key: string) => {
//   return window.localStorage.getItem(key);
// };

// const useLocalStorageSubscribe = (callback: () => void) => {
//   window.addEventListener("storage", callback);
//   return () => window.removeEventListener("storage", callback);
// };

// const getLocalStorageServerSnapshot = () => {
//   throw Error("useLocalStorage is a client-only hook");
// };

// const removeLocalStorageItem = (key: string) => {
//   window.localStorage.removeItem(key);
//   dispatchStorageEvent(key, null);
// };

// const setLocalStorageItem = (key: string, value: any) => {
//   const stringifiedValue = JSON.stringify(value);
//   window.localStorage.setItem(key, stringifiedValue);
//   dispatchStorageEvent(key, stringifiedValue);
// };

// function dispatchStorageEvent(key: string, newValue: any) {
//   window.dispatchEvent(new StorageEvent("storage", { key, newValue }));
// }

// export function useLocalStorage<TValue>(key: string, initialValue: TValue) {
//   const getSnapshot = () => getLocalStorageItem(key);

//   const store = React.useSyncExternalStore(
//     useLocalStorageSubscribe,
//     getSnapshot,
//     getLocalStorageServerSnapshot
//   );

//   const setState = React.useCallback(
//     (v: any) => {
//       try {
//         const nextState = typeof v === "function" ? v(JSON.parse(store!)) : v;

//         if (nextState === undefined || nextState === null) {
//           removeLocalStorageItem(key);
//         } else {
//           setLocalStorageItem(key, nextState);
//         }
//       } catch (e) {
//         console.warn(e);
//       }
//     },
//     [key, store]
//   );

//   React.useEffect(() => {
//     if (
//       getLocalStorageItem(key) === null &&
//       typeof initialValue !== "undefined"
//     ) {
//       setLocalStorageItem(key, initialValue);
//     }
//   }, [key, initialValue]);

//   return [store ? JSON.parse(store) : initialValue, setState];
// }

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

export function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const isMounted = useRef(false);
  const [value, setValue] = useState<T>(defaultValue);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setValue(JSON.parse(item));
      }
    } catch (e) {
      console.log(e);
    }
    return () => {
      isMounted.current = false;
    };
  }, [key]);

  useEffect(() => {
    if (isMounted.current) {
      window.localStorage.setItem(key, JSON.stringify(value));
    } else {
      isMounted.current = true;
    }
  }, [key, value]);

  return [value, setValue];
}
