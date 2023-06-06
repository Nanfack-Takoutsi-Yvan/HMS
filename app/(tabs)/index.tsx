import { useContext } from "react"
import { StyleSheet, ScrollView, FlatList } from "react-native"
import { Text, FAB, useTheme } from "react-native-paper"
import { useRouter } from "expo-router"

import AppointmentCard from "@components/AppointmentCard"
import SkeletonLoaders from "@components/SkeletonLoaders"
import AppStateContext from "@services/context"
import layout from "@constants/layout"
import { View } from "@components/Themed"

export default function TabOneScreen() {
  const { locale, appointments, loading } = useContext(AppStateContext)
  const { colors } = useTheme()
  const router = useRouter()

  return (
    <View style={styles.container}>
      <View>
        <Text variant="titleLarge">{locale.t("availabilities.title")}</Text>
      </View>

      {loading && (
        <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
          <View style={styles.screen}>
            <SkeletonLoaders number={layout.skeleton.number} />
          </View>
        </ScrollView>
      )}

      {!loading && (
        <FlatList
          data={appointments}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatList}
          renderItem={data => <AppointmentCard info={data.item} />}
        />
      )}

      <FAB
        icon="plus"
        color="#fff"
        style={[styles.fab, { backgroundColor: colors.primary }]}
        onPress={() => router.push("modal")}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  container: {
    flex: 1,
    paddingTop: layout.spacing.paddings.big,
    paddingHorizontal: layout.spacing.paddings.big,
    rowGap: layout.spacing.rowGap.regular
  },
  fab: {
    position: "absolute",
    margin: layout.spacing.margin.regular,
    right: layout.spacing.margin.null,
    bottom: layout.spacing.margin.big,
    borderRadius: layout.border.radius.xBig
  },
  flatList: { rowGap: layout.spacing.rowGap.regular }
})
