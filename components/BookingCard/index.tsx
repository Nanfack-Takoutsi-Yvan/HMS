import CalendarDays from "@components/CalendarDays"
import { DATE_FORMAT } from "@components/CalendarDays/__index.utils"
import AppStateContext from "@services/context"
import { getTime } from "@services/utils/dateTime"
import { formatNumber } from "@services/utils/formating"
import { FC, useContext } from "react"
import { StyleSheet, View } from "react-native"
import { Avatar, Switch, Text, Divider, useTheme } from "react-native-paper"
import Icon from "react-native-paper/src/components/Icon"

const BookingCard: FC<BookingCardProps> = ({
  info: { location, consign, price, startTime, endTime, activate, days, type }
}) => {
  const { locale } = useContext(AppStateContext)
  const { colors } = useTheme()

  const isAvailable = `${activate}` === "true"
  const hospitals = location.split(",")
  const text = consign?.replace(/<[^>]+>/g, "")

  return (
    <View style={styles.card}>
      <View style={[styles.cardHeader, styles.padding]}>
        <View>
          <Text variant="labelMedium">
            {locale.t("availabilities.available?")}
          </Text>
        </View>
        <View style={styles.cardHeaderAction}>
          <Text variant="labelLarge">
            {isAvailable ? locale.t("common.yes") : locale.t("common.no")}
          </Text>
          <Switch
            style={styles.switch}
            value={isAvailable}
            color="green"
            shouldRasterizeIOS
          />
        </View>
      </View>
      <Divider />
      <View style={[styles.cardContent, styles.padding]}>
        <View style={styles.cardContentHeader}>
          <Avatar.Text
            size={32}
            label={locale.t(`hospitals.${hospitals[0]}`)[0]}
            style={{ backgroundColor: colors.tertiary }}
          />
          <Text variant="titleMedium">
            {locale.t(`hospitals.${hospitals[0]}`)}
          </Text>
        </View>

        <View style={styles.cardBody}>
          <View style={styles.cardContentBodyPlaceTime}>
            <Text variant="titleSmall" style={{ color: colors.primary }}>
              {locale.t(`availabilities.${type}`)}
            </Text>
            <Text>
              {getTime(startTime)} - {getTime(endTime)}
            </Text>
          </View>
          {isAvailable && (
            <View style={styles.cardBodyCalendarIcon}>
              <Icon source="calendar-month" size={24} color={colors.primary} />
            </View>
          )}
        </View>

        <View style={styles.cardContentFooter}>
          <CalendarDays format={DATE_FORMAT.SHORT} value={days} />
          <View>
            <Text variant="titleMedium">
              {formatNumber(price!, locale.locale)} xaf
            </Text>
          </View>
        </View>
      </View>
      {consign && (
        <>
          <Divider />
          <View style={[styles.cardFooter, styles.padding]}>
            <Text numberOfLines={2} ellipsizeMode="tail">
              {text}
            </Text>
          </View>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff"
  },
  padding: {
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  cardHeaderAction: {
    flexDirection: "row",
    alignItems: "center"
  },
  cardContent: {
    rowGap: 12,
    paddingBottom: 20
  },
  cardContentHeader: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 12
  },
  cardBody: {
    flexDirection: "row",
    alignItems: "center"
  },
  cardContentBodyPlaceTime: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 24
  },
  cardBodyCalendarIcon: {
    flex: 1,
    alignItems: "center"
  },
  cardContentFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  cardFooter: { paddingBottom: 20 },
  switch: { transform: [{ scaleX: 0.5 }, { scaleY: 0.5 }] }
})

export default BookingCard
