import { useEffect, useState } from "react"
import { I18n } from "i18n-js"
import locales from "@constants/locales"
import { getData, storeData } from "@services/utils/storage"

const useLocales = (deviceLocale: string) => {
  const [locale, setAppLocale] = useState<string>("en")

  const i18n = new I18n(locales)
  i18n.enableFallback = true
  i18n.locale = locale

  const setLocale = (code: string) => {
    setAppLocale(code)

    const localeKey = process.env.HMS_LOCALE
    if (localeKey) {
      storeData(localeKey, code)
    }
  }

  useEffect(() => {
    const setInitialLocale = async () => {
      const localeKey = process.env.HMS_LOCALE

      if (localeKey) {
        const storedLocale = await getData(localeKey)
        setLocale(storedLocale || deviceLocale)
      }
    }

    setInitialLocale()
  }, [deviceLocale])

  return { i18n, setLocale }
}

export default useLocales
