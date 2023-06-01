import { View } from "@components/Themed"
import AppStateContext from "@services/context"
import { FC, useContext, useEffect, useState } from "react"
import { Text, useTheme } from "react-native-paper"
import { StyleSheet, TouchableOpacity } from "react-native"
import { DATE_FORMAT } from "./__index.utils"
import { CalendarDaysProps, CalendarDaysType, Days } from "./index.types"

const CalendarDays: FC<CalendarDaysProps> = ({
  style,
  value,
  format,
  onChange,
  textStyle,
  elementStyle
}) => {
  const [selectedDays, setSelectedDays] = useState<CalendarDaysType>([])

  const { colors } = useTheme()
  const { locale } = useContext(AppStateContext)

  const selectADay = (day: Days) => {
    const days = selectedDays.includes(day)
      ? selectedDays.filter(currentDay => currentDay !== day)
      : [...selectedDays, day]

    if (onChange) {
      onChange(days.toString())
    }
  }

  useEffect(() => {
    if (value) {
      const days = value.split(",") as CalendarDaysType
      setSelectedDays(days)
    } else {
      setSelectedDays([])
    }
  }, [value])

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
              backgroundColor: selectedDays.includes(day as Days)
                ? colors.primary
                : "rgba(0,0,0,0.05)"
            }
          ]}
        >
          <TouchableOpacity
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
                {
                  color: selectedDays.includes(day as Days) ? "#fff" : undefined
                }
              ]}
            >
              {weekDays[day as Days].substring(
                0,
                numberOfLetters[format || DATE_FORMAT.SHORT]
              )}
            </Text>
          </TouchableOpacity>
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
