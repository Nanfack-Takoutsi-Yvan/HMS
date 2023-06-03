import FontAwesome from "@expo/vector-icons/FontAwesome"
import { PaperProvider } from "react-native-paper"
import { useFonts } from "expo-font"
import { SplashScreen, Stack } from "expo-router"
import { useEffect, useMemo, useState } from "react"
import * as localization from "expo-localization"

import useLocales from "@hooks/locale/useTranslation"
import AppStateContext from "@services/context"
import Appointment from "@services/models/appointment"

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from "expo-router"

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)"
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font
  })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  return (
    <>
      {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
      {!loaded && <SplashScreen />}
      {loaded && <RootLayoutNav />}
    </>
  )
}

function RootLayoutNav() {
  const [appointments, setAppointments] = useState<Appointment[]>()
  const [loading, setLoading] = useState<boolean>(true)

  const { i18n, setLocale } = useLocales(localization.locale)

  useEffect(() => {
    const unsubscribe = Appointment.getAllAppointments(setAppointments)
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (appointments) {
      setLoading(false)
    }
  }, [appointments])

  const contextValue = useMemo(
    () => ({ setLocale, locale: i18n, appointments, loading, setLoading }),
    [i18n, setLocale, appointments, loading, setLoading]
  )

  return (
    <AppStateContext.Provider value={contextValue}>
      <PaperProvider>
        <Stack screenOptions={{ headerShown: false }} initialRouteName="(tabs)">
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="modal"
            options={{ presentation: "containedModal" }}
          />
          <Stack.Screen
            name="consign"
            options={{ presentation: "containedModal" }}
          />
          <Stack.Screen
            name="loadingModal"
            options={{ presentation: "containedTransparentModal" }}
          />
        </Stack>
      </PaperProvider>
    </AppStateContext.Provider>
  )
}
