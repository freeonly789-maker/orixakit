/**
 * useLocalStorage
 * SSR-safe localStorage hook with type inference and JSON serialization.
 * @orixakit/use-local-storage
 */
"use client"

import { useState, useEffect, useCallback } from "react"

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue)

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (item !== null) setStoredValue(JSON.parse(item))
    } catch {
      console.warn(`useLocalStorage: error reading key "${key}"`)
    }
  }, [key])

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value
        setStoredValue(valueToStore)
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      } catch {
        console.warn(`useLocalStorage: error setting key "${key}"`)
      }
    },
    [key, storedValue]
  )

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key)
      setStoredValue(initialValue)
    } catch {
      console.warn(`useLocalStorage: error removing key "${key}"`)
    }
  }, [key, initialValue])

  return [storedValue, setValue, removeValue]
}
