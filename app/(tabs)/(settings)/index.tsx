import { useRouter } from "expo-router"
import { useContext } from "react"
import { StyleSheet, ScrollView } from "react-native"
import { Avatar, Text, Card, useTheme } from "react-native-paper"

import AppStateContext from "@services/context"
import layout from "@constants/layout"
import { View } from "@components/Themed"

export default function TabTwoScreen() {
  const router = useRouter()
  const { locale, isDarkTheme } = useContext(AppStateContext)
  const { colors } = useTheme()

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: isDarkTheme ? colors.background : "transparent"
      }}
    >
      <ScrollView style={styles.screen}>
        <View style={styles.screen}>
          <Card
            onPress={() => router.push("language")}
            mode="contained"
            style={{
              backgroundColor: isDarkTheme ? "#555" : "#fff"
            }}
          >
            <Card.Content style={styles.cardContent}>
              <View style={{ backgroundColor: "transparent" }}>
                <Avatar.Icon
                  color="#000"
                  icon="translate"
                  style={styles.avatar}
                  size={layout.size.icons.big}
                />
              </View>
              <Text variant="titleMedium">{locale.t("common.language")}</Text>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  container: {
    flex: 1,
    paddingHorizontal: layout.spacing.paddings.big,
    paddingVertical: layout.spacing.paddings.small
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: layout.spacing.columnGap.regular
  },
  avatar: {
    borderRadius: layout.border.radius.regular,
    backgroundColor: "#fff",
    borderWidth: layout.border.width.regular
  }
})
