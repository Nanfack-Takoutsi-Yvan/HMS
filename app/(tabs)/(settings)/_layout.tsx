import AppStateContext from "@services/context"
import { Stack } from "expo-router"
import { useContext } from "react"
import { useTheme } from "react-native-paper/src/core/theming"

function SettingsStackNavigator() {
  const { locale, isDarkTheme } = useContext(AppStateContext)
  const { colors } = useTheme()

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: isDarkTheme ? colors.background : undefined
        },
        headerTitleStyle: {
          color: isDarkTheme ? "#eee" : undefined
        }
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: locale.t("settings.tab")
        }}
      />
      <Stack.Screen
        name="language"
        options={{
          title: locale.t("common.language")
        }}
      />
    </Stack>
  )
}

export default SettingsStackNavigator
