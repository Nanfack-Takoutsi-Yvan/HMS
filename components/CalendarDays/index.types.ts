import { StyleProp, TextStyle, ViewStyle } from "react-native"
import { DATE_FORMAT } from "./__index.utils"

export type CalendarDaysProps = {
  value?: string
  format: DATE_FORMAT
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  elementStyle?: StyleProp<ViewStyle>
  onChange?: (value: string) => void
}

export type Days =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday"

export type CalendarDaysType = Days[]
