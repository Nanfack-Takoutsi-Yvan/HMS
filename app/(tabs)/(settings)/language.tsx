import { FC, useContext } from "react"
import { StyleSheet, TouchableOpacity } from "react-native"
import { Text, useTheme } from "react-native-paper"

import layout from "@constants/layout"
import AppStateContext from "@services/context"
import { View } from "@components/Themed"

const LanguageScreen: FC = () => {
  const { locale, setLocale, isDarkTheme } = useContext(AppStateContext)
  const { colors } = useTheme()

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: !isDarkTheme ? "transparent" : colors.background
      }}
    >
      <View
        style={{
          ...styles.card,
          backgroundColor: isDarkTheme ? "#555" : "#fff"
        }}
      >
        <Text variant="titleMedium">{locale.t("common.language")}</Text>
        <Text>{locale.t(`common.${locale.locale.split("-")[0]}`)}</Text>
      </View>
      <View
        style={{
          ...styles.card,
          backgroundColor: isDarkTheme ? "#555" : "#fff"
        }}
      >
        <View style={{ backgroundColor: "transparent" }}>
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
            <View style={{ backgroundColor: "transparent" }}>
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
    backgroundColor: "rgba(230,230,230,0.4)",
    marginHorizontal: -layout.spacing.paddings.regular,
    paddingHorizontal: layout.spacing.paddings.small
  }
})

export default LanguageScreen
