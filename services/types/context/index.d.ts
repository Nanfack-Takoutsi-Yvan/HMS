import { I18n } from "i18n-js/typings"

interface AppContextProps {
  locale: I18n
  setLocale: React.Dispatch<React.SetStateAction<string>>
}
