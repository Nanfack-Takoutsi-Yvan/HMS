import { useRouter } from "expo-router"
import { useContext, useEffect } from "react"
import { View, StyleSheet, ActivityIndicator } from "react-native"
import { useTheme } from "react-native-paper/src/core/theming"

import layout from "@constants/layout"
import AppStateContext from "@services/context"

export default function LoadingModalScreen() {
  const router = useRouter()
  const { loading } = useContext(AppStateContext)

  useEffect(() => {
    if (!loading) {
      router.back()
    }
  }, [loading, router])

  const { colors } = useTheme()
  return (
    <View
      style={[
        styles.screen,
        { backgroundColor: loading ? "rgba(30, 30, 30, 0.2)" : "transparent" }
      ]}
    >
      <View style={styles.container}>
        <ActivityIndicator color={colors.primary} size={60} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    height: 120,
    borderRadius: layout.border.radius.big
  }
})
