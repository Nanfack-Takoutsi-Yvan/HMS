import AppointmentCard from "@components/AppointmentCard"
import AppStateContext from "@services/context"
import { useContext } from "react"
import { StyleSheet, View, ScrollView, FlatList } from "react-native"
import { Text, FAB, useTheme } from "react-native-paper"
import { useRouter } from "expo-router"
import SkeletonLoaders from "@components/SkeletonLoaders"

export default function TabOneScreen() {
  const { locale, appointments, loading } = useContext(AppStateContext)
  const { colors } = useTheme()
  const router = useRouter()

  const sortedAppointments = appointments?.sort(
    (appointmentA, appointmentB) =>
      new Date(appointmentA?.startTime).getTime() -
      new Date(appointmentB?.startTime).getTime()
  )

  return (
    <View style={styles.container}>
      <View>
        <Text variant="titleLarge">{locale.t("availabilities.title")}</Text>
      </View>

      {loading && (
        <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
          <View style={styles.screen}>
            <SkeletonLoaders number={2} />
          </View>
        </ScrollView>
      )}

      {!loading && (
        <FlatList
          data={appointments}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ rowGap: 16 }}
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
    paddingTop: 30,
    paddingHorizontal: 24,
    rowGap: 16,
    backgroundColor: "#fff"
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 24,
    borderRadius: 100
  }
})
