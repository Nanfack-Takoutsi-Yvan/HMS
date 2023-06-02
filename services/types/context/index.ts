import { I18n } from "i18n-js/typings"

import Appointment from "@services/models/appointment"

export default interface AppContextProps {
  locale: I18n
  setLocale: React.Dispatch<React.SetStateAction<string>>
  appointments?: Appointment[]
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}
