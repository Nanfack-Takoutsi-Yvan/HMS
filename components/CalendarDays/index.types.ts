import { DATE_FORMAT } from "./__index.utils"

export type CalendarDaysProps = {
  format: DATE_FORMAT
  onChange?: (value: CalendarDaysType) => void
}

export type Days =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday"

export type CalendarDaysType = {
  monday: boolean
  tuesday: boolean
  wednesday: boolean
  thursday: boolean
  friday: boolean
  saturday: boolean
  sunday: boolean
}
