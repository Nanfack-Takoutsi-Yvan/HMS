import AppStateContext from "@services/context"
import { Stack } from "expo-router"
import { useContext } from "react"

function SettingsStackNavigator() {
  const { locale } = useContext(AppStateContext)

  return (
    <Stack>
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
