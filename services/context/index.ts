import { I18n } from "i18n-js"
import { createContext } from "react"
import { AppContextProps } from "@services/types/context"

const AppStateContext = createContext<AppContextProps>({
  locale: new I18n(),
  setLocale: () => null,
})

export default AppStateContext
