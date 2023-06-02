import FontAwesome from "@expo/vector-icons/FontAwesome"
import { PaperProvider } from "react-native-paper"
import { useFonts } from "expo-font"
import { SplashScreen, Stack } from "expo-router"
import { useEffect, useMemo } from "react"
import { useColorScheme } from "react-native"
import * as localization from "expo-localization"

import useLocales from "@hooks/locale/useTranslation"
import AppStateContext from "@services/context"

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
  const colorScheme = useColorScheme()
  const { i18n, setLocale } = useLocales(localization.locale)

  const contextValue = useMemo(
    () => ({ setLocale, locale: i18n }),
    [i18n, setLocale]
  )

  return (
    <AppStateContext.Provider value={contextValue}>
      <PaperProvider>
        <Stack screenOptions={{ headerShown: false }} initialRouteName="(tabs)">
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal"
            options={{ presentation: "containedModal" }}
          />
          <Stack.Screen
            name="consign"
            options={{ presentation: "containedModal" }}
          />
        </Stack>
      </PaperProvider>
    </AppStateContext.Provider>
  )
}
