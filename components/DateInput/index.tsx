import React, { FC, useEffect, useState } from "react"
import { TouchableOpacity, StyleSheet, View, Platform } from "react-native"
import DateTimePicker, {
  DateTimePickerEvent
} from "@react-native-community/datetimepicker"
import { Text, useTheme } from "react-native-paper"
import { getTime } from "@services/utils/dateTime"

const DateInput: FC<DateInput> = ({ label, value, onChange }) => {
  const [date, setDate] = useState<Date>(new Date("2023-06-01T04:00:00.000Z"))
  const [show, setShow] = useState<boolean>(false)

  const { colors } = useTheme()

  const onChangeTime = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    if (selectedDate) {
      const currentDate = selectedDate
      setShow(false)

      if (onChange) {
        onChange(currentDate.toUTCString())
      }
    }
  }

  const showTimepicker = () => {
    setShow(true)
  }

  useEffect(() => {
    try {
      if (value) {
        const time = new Date(value)
        setDate(time)
      }
    } catch {
      console.log("invalid time")
    }
  }, [value, onChange])

  return (
    <View style={[styles.container]}>
      <View style={[styles.labelContainer]}>
        <Text style={styles.label}>{label}</Text>
      </View>
      {Platform.OS === "android" ? (
        <View>
          <TouchableOpacity style={styles.frame} onPress={showTimepicker}>
            <Text variant="bodyLarge">{getTime(date.toString())}</Text>
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="time"
              is24Hour
              onChange={onChangeTime}
            />
          )}
        </View>
      ) : (
        <View>
          <DateTimePicker
            value={date}
            mode="time"
            is24Hour
            onChange={onChangeTime}
            accentColor={colors.primary}
          />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    rowGap: 4
  },
  labelContainer: {
    justifyContent: "center",
    alignContent: "center"
  },
  label: {
    textAlign: "center"
  },
  frame: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.05)",
    padding: 12,
    borderRadius: 16
  }
})

export default DateInput
