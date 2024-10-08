import { createContext } from 'react'

interface IAppContext {
  sessionToken: string
}

const InitialAppContext: IAppContext = {
  sessionToken: ''
}

const AppContext = createContext<IAppContext>(InitialAppContext)

export default function AppProvider({ children }: { children: React.ReactNode }) {
  return <div>AppProvider</div>
}
