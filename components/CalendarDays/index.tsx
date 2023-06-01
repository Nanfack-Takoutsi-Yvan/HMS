import { View } from "@components/Themed"
import AppStateContext from "@services/context"
import { FC, useContext, useState } from "react"
import { Text, useTheme } from "react-native-paper"
import { StyleSheet, Pressable } from "react-native"
import { DATE_FORMAT } from "./__index.utils"
import { CalendarDaysProps, CalendarDaysType, Days } from "./index.types"

const CalendarDays: FC<CalendarDaysProps> = ({
  format,
  onChange,
  style,
  elementStyle,
  textStyle
}) => {
  const [selectedDays, setSelectedDays] = useState<CalendarDaysType>(
    {} as CalendarDaysType
  )

  const { colors } = useTheme()
  const { locale } = useContext(AppStateContext)

  const selectADay = (day: Days) => {
    if (onChange) {
      setSelectedDays(currentSelection => ({
        ...currentSelection,
        [day]: !currentSelection[day]
      }))
    }
  }

  const numberOfLetters = {
    [DATE_FORMAT.LONG]: 3,
    [DATE_FORMAT.SHORT]: 1
  }
  const weekDays = {
    monday: locale.t("common.week.monday"),
    tuesday: locale.t("common.week.tuesday"),
    wednesday: locale.t("common.week.wednesday"),
    thursday: locale.t("common.week.thursday"),
    friday: locale.t("common.week.friday"),
    saturday: locale.t("common.week.saturday"),
    sunday: locale.t("common.week.sunday")
  }

  return (
    <View style={[styles.container, style]}>
      {Object.keys(weekDays).map(day => (
        <View
          key={day}
          style={[
            styles.dateContainer,
            elementStyle,
            {
              backgroundColor: selectedDays[day as Days]
                ? colors.primary
                : "rgba(0,0,0,0.05)"
            }
          ]}
        >
          <Pressable
            style={styles.pressable}
            onPress={selectADay.bind(null, day as Days)}
          >
            <Text
              variant={
                format === DATE_FORMAT.LONG ? "labelLarge" : "labelSmall"
              }
              style={[
                styles.date,
                textStyle,
                { color: selectedDays[day as Days] ? "#fff" : undefined }
              ]}
            >
              {weekDays[day as Days].substring(
                0,
                numberOfLetters[format || DATE_FORMAT.SHORT]
              )}
            </Text>
          </Pressable>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    columnGap: 4,
    alignItems: "stretch"
  },
  dateContainer: {
    padding: 2,
    borderRadius: 4,
    minWidth: 20,
    justifyContent: "center",
    alignContent: "center"
  },
  date: {
    textAlign: "center"
  },
  pressable: { flex: 1, justifyContent: "center", alignItems: "center" }
})

export default CalendarDays
