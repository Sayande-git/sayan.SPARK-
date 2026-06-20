import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from 'react'

export type Theme =
  | 'light'
  | 'dark'

export interface ThemeContextValue {
  theme: Theme
  setTheme: Dispatch<
    SetStateAction<Theme>
  >
  toggleTheme: () => void
}

export const ThemeContext =
  createContext<
    ThemeContextValue | undefined
  >(undefined)

export function ThemeProvider({
  children,
}: {
  children: ReactNode
}) {
  const [theme, setTheme] =
    useState<Theme>('light')

  useEffect(() => {
    try {
      if (
        typeof window !==
          'undefined' &&
        window.localStorage &&
        typeof window.localStorage
          .setItem ===
          'function'
      ) {
        window.localStorage.setItem(
          'task-app-theme',
          theme
        )
      }
    } catch {
      // ignore
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) =>
      prev === 'light'
        ? 'dark'
        : 'light'
    )
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context =
    useContext(ThemeContext)

  if (!context) {
    throw new Error(
      'useTheme must be used within ThemeProvider'
    )
  }

  return context
}