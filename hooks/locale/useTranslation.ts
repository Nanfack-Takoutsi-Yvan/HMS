import { useEffect, useState } from "react"
import { I18n } from "i18n-js"
import locales from "@constants/locales"

const useLocales = (deviceLocale: string) => {
  const [locale, setLocale] = useState<string>("en")

  const i18n = new I18n(locales)
  i18n.enableFallback = true
  i18n.locale = locale

  useEffect(() => {
    setLocale(deviceLocale)
  }, [deviceLocale])

  return { i18n, setLocale }
}

export default useLocales
