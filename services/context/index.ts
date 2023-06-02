import { createContext } from "react"
import { I18n } from "i18n-js"
import AppContextProps from "../types/context"

const AppStateContext = createContext<AppContextProps>({
  locale: new I18n(),
  setLocale: () => null,
  appointments: undefined,
  loading: true
})

export default AppStateContext
