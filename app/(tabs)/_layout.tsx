import { Tabs } from "expo-router"
import { StyleSheet, View } from "react-native"
import Icon from "react-native-paper/src/components/Icon"
import { IconButton, useTheme } from "react-native-paper"

import { useContext } from "react"
import AppStateContext from "@services/context"
import Avatar from "@components/Avatar"

export default function TabLayout() {
  const { colors } = useTheme()
  const { locale } = useContext(AppStateContext)

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "",
          title: locale.t("availabilities.tab"),
          headerStyle: styles.header,
          tabBarIcon: ({ color, size }) => (
            <Icon source="calendar-today" color={color} size={size} />
          ),
          headerLeft: () => (
            <View style={styles.avatarContainer}>
              <IconButton icon="arrow-left" style={styles.iconButton} />
              <Avatar
                title="Dr Patrick James"
                subtitle={locale.t("common.specialties.ophthalmologist")}
              />
            </View>
          )
        }}
      />
      <Tabs.Screen
        name="(settings)"
        options={{
          headerShown: false,
          title: locale.t("settings.tab"),
          tabBarIcon: ({ color, size }) => (
            <Icon source="cog-outline" color={color} size={size} />
          )
        }}
      />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  header: { shadowColor: "transparent" },
  avatarContainer: { flexDirection: "row", columnGap: 4 },
  iconButton: { marginLeft: 15 }
})
