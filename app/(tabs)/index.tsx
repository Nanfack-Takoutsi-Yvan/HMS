import BookingCard from "@components/BookingCard"
import AppStateContext from "@services/context"
import { useContext } from "react"
import { StyleSheet, View, ScrollView } from "react-native"
import { Text, FAB, useTheme } from "react-native-paper"
import bookings from "@constants/utils/booking.json"
import { useRouter } from "expo-router"

export default function TabOneScreen() {
  const { locale } = useContext(AppStateContext)
  const { colors } = useTheme()
  const router = useRouter()

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.screen}>
        <View style={styles.container}>
          <View>
            <Text variant="titleLarge">{locale.t("availabilities.title")}</Text>
          </View>
          {bookings.map(booking => (
            <BookingCard key={booking.id} info={booking} />
          ))}
        </View>
      </ScrollView>
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
    flex: 1,
    backgroundColor: "#fff"
  },
  container: {
    flex: 1,
    marginTop: 30,
    marginHorizontal: 24,
    rowGap: 16
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 24,
    borderRadius: 100
  }
})
