import AppStateContext from "@services/context"
import { useRouter } from "expo-router"
import { useContext } from "react"
import { StyleSheet, View, ScrollView } from "react-native"
import { Avatar, Text, Card } from "react-native-paper"

export default function TabTwoScreen() {
  const router = useRouter()
  const { locale } = useContext(AppStateContext)

  return (
    <View style={styles.container}>
      <ScrollView style={styles.screen}>
        <View style={styles.screen}>
          <Card
            onPress={() => router.push("language")}
            mode="contained"
            style={styles.card}
          >
            <Card.Content style={styles.cardContent}>
              <View>
                <Avatar.Icon
                  color="#000"
                  icon="translate"
                  style={styles.avatar}
                  size={48}
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
    paddingHorizontal: 24,
    paddingVertical: 12
  },
  card: {
    backgroundColor: "#fff"
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 16
  },
  avatar: {
    borderRadius: 10,
    backgroundColor: "#fff",
    borderWidth: 1
  }
})
