
import { createContext } from "react"
import AppContextProps from "../types/context"
import { I18n } from "i18n-js"

const AppStateContext = createContext<AppContextProps>({
  locale: new I18n(),
  setLocale: () => null
})

export default AppStateContext
