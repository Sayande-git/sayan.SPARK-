import {
  useState,
} from 'react'

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
) {
  const [storedValue, setStoredValue] =
    useState<T>(() => {
      try {
        const item =
          localStorage.getItem(
            key
          )

        if (!item) {
          return initialValue
        }

        return JSON.parse(
          item
        ) as T
      } catch {
        return initialValue
      }
    })

  const setValue = (
    value:
      | T
      | ((
          prev: T
        ) => T)
  ) => {
    try {
      const valueToStore =
        value instanceof Function
          ? value(
              storedValue
            )
          : value

      setStoredValue(
        valueToStore
      )

      localStorage.setItem(
        key,
        JSON.stringify(
          valueToStore
        )
      )
    } catch {
      // ignore storage errors
    }
  }

  return [
    storedValue,
    setValue,
  ] as const
}