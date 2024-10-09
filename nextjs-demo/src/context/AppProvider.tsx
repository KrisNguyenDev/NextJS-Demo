'use client'
import { createContext, useContext, useState } from 'react'

interface IAppContext {
  sessionToken: string
  setSessionToken: (sessionToken: string) => void
}

const InitialAppContext: IAppContext = {
  sessionToken: '',
  setSessionToken: (sessionToken: string) => {}
}

export const AppContext = createContext<IAppContext>(InitialAppContext)

export const useAppContext = () => {
  const context = useContext(AppContext)
  return context
}

export default function AppProvider({
  children,
  initialSessionToken = ''
}: {
  children: React.ReactNode
  initialSessionToken: string
}) {
  const [sessionToken, setSessionToken] = useState(initialSessionToken)
  return <AppContext.Provider value={{ sessionToken, setSessionToken }}>{children}</AppContext.Provider>
}
