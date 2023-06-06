import AppStateContext from "@services/context"
import { FC, useContext } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { Text } from "react-native-paper"

const LanguageScreen: FC = () => {
  const { locale, setLocale } = useContext(AppStateContext)

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text variant="titleMedium">{locale.t("common.language")}</Text>
        <Text>{locale.t(`common.${locale.locale.split("-")[0]}`)}</Text>
      </View>
      <View style={styles.card}>
        <View>
          <Text variant="titleMedium">
            {locale.t("settings.selectLanguage")}
          </Text>
        </View>
        {Object.keys(locale.translations).map(key => (
          <TouchableOpacity
            key={key}
            style={[
              styles.languageCard,
              key === locale.locale && styles.selected
            ]}
            onPress={() => {
              if (locale.locale !== key) setLocale(key)
            }}
          >
            <View>
              <Text>{locale.t(`common.${key}`)}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
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
    paddingVertical: 12,
    rowGap: 12
  },
  card: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    rowGap: 12
  },
  languageCard: {
    height: 48,
    justifyContent: "center"
  },
  selected: {
    backgroundColor: "rgba(30,30,30,0.1)",
    marginHorizontal: -16,
    paddingHorizontal: 12
  }
})

export default LanguageScreen
