import { FC, useContext } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { Text } from "react-native-paper"

import layout from "@constants/layout"
import AppStateContext from "@services/context"

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
    paddingHorizontal: layout.spacing.paddings.big,
    paddingVertical: layout.spacing.paddings.small,
    rowGap: layout.spacing.rowGap.regular
  },
  card: {
    backgroundColor: "#fff",
    paddingHorizontal: layout.spacing.paddings.regular,
    paddingVertical: layout.spacing.paddings.small,
    borderRadius: layout.border.radius.regular,
    rowGap: layout.spacing.rowGap.regular
  },
  languageCard: {
    height: 48,
    justifyContent: "center"
  },
  selected: {
    backgroundColor: "rgba(30,30,30,0.1)",
    marginHorizontal: -layout.spacing.paddings.regular,
    paddingHorizontal: layout.spacing.paddings.small
  }
})

export default LanguageScreen
