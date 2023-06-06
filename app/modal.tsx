import { useLocalSearchParams, useRouter } from "expo-router"
import { useContext, useEffect, useState } from "react"
import { StatusBar } from "expo-status-bar"
import {
  Button,
  IconButton,
  Switch,
  Text,
  TextInput,
  useTheme
} from "react-native-paper"
import { Formik, useFormikContext } from "formik"
import {
  View,
  Platform,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native"
import * as Haptics from "expo-haptics"
import {
  MultipleSelectList,
  SelectList
} from "react-native-dropdown-select-list"
import Icon from "react-native-paper/src/components/Icon"

import Appointment from "@services/models/appointment"
import AppStateContext from "@services/context"
import layoutConstants from "@constants/layout"
import CalendarDays from "@components/CalendarDays"
import { DATE_FORMAT } from "@components/CalendarDays/__index.utils"
import DateInput from "@components/DateInput/index"
import { RichTextViewer } from "@siposdani87/expo-rich-text-editor"
import createAppointmentSchema from "@services/validation/createAppointmentSchema"

export default function ModalScreen() {
  const [selected, setSelected] = useState<string[]>([])

  const { locale, setLoading } = useContext(AppStateContext)
  const { colors } = useTheme()
  const router = useRouter()
  const { consign } = useLocalSearchParams() as { consign: string }

  const HandleConsignChanges = ({ value }: { value: string }) => {
    // Grab values from params and update formik from context
    const { handleChange } = useFormikContext()
    useEffect(() => {
      handleChange("consign")(consign || "")
    }, [value, handleChange])

    return null
  }

  const data = [
    { key: "onSite", value: locale.t("availabilities.onSite") },
    { key: "remote", value: locale.t("availabilities.remote") }
  ]

  const hospitals = [
    { key: "sjdh-euos", value: locale.t("hospitals.sjdh-euos") },
    { key: "hsex-elsy", value: locale.t("hospitals.hsex-elsy") }
  ]

  const handleSave = ({
    activate,
    consign: consignValue,
    days,
    endTime,
    location,
    price,
    startTime,
    type
  }: Appointment) => {
    const appointment = new Appointment({
      activate,
      consign: consignValue,
      days,
      endTime,
      location,
      price,
      startTime,
      type
    } as IAppointment)

    setLoading(true)
    router.push("loadingModal")
    appointment
      .save()
      .then(() =>
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
      )
      .catch(() =>
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
      )
      .finally(() => {
        setLoading(false)
        setTimeout(() => router.push("(tabs)"))
      })
  }

  return (
    <>
      <StatusBar style={Platform.OS === "ios" ? "dark" : "auto"} />
      <KeyboardAvoidingView
        style={styles.screen}
        contentContainerStyle={styles.screen}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <SafeAreaView style={styles.screen}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text variant="titleLarge">{locale.t("modal.title")}</Text>
              <IconButton icon="close" onPress={() => router.back()} />
            </View>
            <ScrollView
              style={styles.screen}
              showsVerticalScrollIndicator={false}
            >
              <Formik
                initialValues={new Appointment()}
                validationSchema={createAppointmentSchema}
                onSubmit={handleSave}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched
                }) => (
                  <View style={styles.form}>
                    <View>
                      <View
                        style={[
                          styles.consignView,
                          {
                            borderColor:
                              errors.type && touched.type
                                ? colors.error
                                : "rgba(0,0,0,0.08)"
                          }
                        ]}
                      >
                        <View>
                          <Text variant="labelSmall">
                            {locale.t("modal.consultancyTypeSectionTitle")}
                          </Text>
                        </View>
                        <SelectList
                          setSelected={(val: string) => {
                            handleChange("type")(val)
                          }}
                          data={data}
                          save="key"
                          search={false}
                          boxStyles={styles.selectInput}
                          dropdownStyles={styles.dropDown}
                          dropdownItemStyles={styles.dropDownItem}
                          placeholder={locale.t("modal.select")}
                          arrowicon={
                            <Icon
                              source="chevron-down"
                              size={layoutConstants.size.icons.small}
                            />
                          }
                        />
                      </View>

                      {errors.type && touched.type && (
                        <View>
                          <Text style={{ color: colors.error }}>
                            {locale.t(errors.type)}
                          </Text>
                        </View>
                      )}
                    </View>

                    <View>
                      <View
                        style={[
                          styles.consignView,
                          {
                            borderColor:
                              errors.location && touched.location
                                ? colors.error
                                : "rgba(0,0,0,0.08)"
                          }
                        ]}
                      >
                        <MultipleSelectList
                          setSelected={(val: string[]) => {
                            setSelected(val)
                          }}
                          onSelect={() =>
                            handleChange("location")(selected.join(","))
                          }
                          data={hospitals}
                          save="key"
                          arrowicon={<Icon source="chevron-down" size={24} />}
                          boxStyles={styles.multipleSelectInput}
                          dropdownStyles={styles.dropDown}
                          dropdownItemStyles={styles.dropDownItem}
                          label={locale.t("modal.consultancyLocation")}
                          labelStyles={{ fontSize: 12 }}
                          placeholder="select location"
                          badgeStyles={{
                            backgroundColor: colors.primary,
                            borderRadius: 6
                          }}
                        />
                      </View>

                      {errors.location && touched.location && (
                        <View>
                          <Text style={{ color: colors.error }}>
                            {locale.t(errors.location)}
                          </Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.consignView}>
                      <View>
                        <Text variant="titleMedium">
                          {locale.t("modal.consign")}
                        </Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <TouchableOpacity
                          onPress={() =>
                            router.push({
                              pathname: "consign",
                              params: { consign: values.consign || consign }
                            })
                          }
                          style={styles.days}
                        >
                          {!consign && (
                            <Text
                              numberOfLines={2}
                              ellipsizeMode="tail"
                              variant="labelLarge"
                            >
                              {locale.t("modal.consignPlaceholder")}
                            </Text>
                          )}

                          {!!consign && (
                            <RichTextViewer viewerStyle={{}} value={consign} />
                          )}
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View style={{ rowGap: 4 }}>
                      <View style={styles.switchSection}>
                        <Text variant="titleMedium">
                          {locale.t("modal.switchSectionTitle")}
                        </Text>
                        <Switch
                          value={`${values.activate}` === "true"}
                          onValueChange={value => {
                            handleChange("activate")(`${value}`)
                          }}
                        />
                      </View>
                      <Text variant="bodySmall">
                        {locale.t("modal.switchSectionDescription")}
                      </Text>
                    </View>

                    <View style={{ rowGap: 12 }}>
                      <View>
                        <Text variant="titleMedium">
                          {locale.t("modal.calendarSectionTitle")}
                        </Text>
                      </View>
                      <View>
                        <CalendarDays
                          elementStyle={styles.dayTile}
                          format={DATE_FORMAT.LONG}
                          value={values.days}
                          onChange={handleChange("days")}
                        />
                      </View>
                    </View>

                    <View>
                      <View>
                        <Text variant="titleMedium">
                          {locale.t("modal.timeSectionTitle")}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          columnGap: 24,
                          paddingTop: 12
                        }}
                      >
                        <View>
                          <DateInput
                            value={values.startTime}
                            onChange={handleChange("startTime")}
                            label={locale.t("common.start")}
                          />
                        </View>
                        <View>
                          <DateInput
                            value={values.endTime}
                            onChange={handleChange("endTime")}
                            label={locale.t("common.end")}
                          />
                        </View>
                      </View>
                    </View>

                    <View style={{ rowGap: 12 }}>
                      <View>
                        <Text variant="titleMedium">
                          {locale.t("modal.priceSectionTitle")}
                        </Text>
                      </View>
                      <View>
                        <TextInput
                          mode="outlined"
                          placeholder={locale.t("common.amount")}
                          onChangeText={handleChange("price")}
                          onBlur={handleBlur("price")}
                          value={values.price?.toString()}
                          keyboardType="numeric"
                          autoComplete="off"
                          right={<TextInput.Affix text="xaf" />}
                          style={styles.field}
                          outlineStyle={styles.fieldOutline}
                          error={!!errors.price && touched.price}
                          dense
                        />
                        {errors.price && touched.price && (
                          <View>
                            <Text style={{ color: colors.error }}>
                              {locale.t(errors.price)}
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>

                    <View>
                      <Button
                        mode="contained"
                        onPress={() => handleSubmit()}
                        style={styles.button}
                      >
                        {locale.t("common.submit")}
                      </Button>
                    </View>
                    <HandleConsignChanges value={consign} />
                  </View>
                )}
              </Formik>
            </ScrollView>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff"
  },
  container: {
    flex: 1,
    paddingHorizontal: layoutConstants.spacing.paddings.big,
    paddingTop:
      Platform.OS === "android"
        ? layoutConstants.spacing.paddings.big
        : layoutConstants.spacing.paddings.small,
    paddingBottom: layoutConstants.spacing.paddings.small
  },
  iconButton: { marginRight: layoutConstants.spacing.margin.regular },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  form: {
    rowGap: layoutConstants.spacing.rowGap.big,
    flex: 1
  },
  consignView: {
    borderRadius: layoutConstants.border.radius.regular,
    borderWidth: layoutConstants.border.width.regular,
    borderColor: "rgba(0,0,0,0.08)",
    paddingHorizontal: layoutConstants.spacing.paddings.regular,
    rowGap: layoutConstants.spacing.rowGap.small
  },
  days: {
    flex: 1,
    height: 75,
    overflow: "hidden",
    paddingBottom: layoutConstants.spacing.paddings.small
  },
  switchSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  dayTile: {
    flex: 1,
    height: 50,
    borderRadius: layoutConstants.border.radius.regular
  },
  field: {
    backgroundColor: "#fff"
  },
  fieldOutline: {
    borderWidth: 1
  },
  button: {
    borderRadius: layoutConstants.spacing.paddings.small
  },
  selectInput: {
    borderColor: "transparent",
    paddingHorizontal: layoutConstants.spacing.paddings.null
  },
  dropDown: {
    borderColor: "transparent",
    borderTopColor: "rgba(30,30,30,0.1)",
    borderRadius: layoutConstants.border.radius.null
  },
  dropDownItem: {
    paddingHorizontal: layoutConstants.spacing.paddings.null
  },
  multipleSelectInput: {
    borderColor: "transparent",
    padding: layoutConstants.spacing.paddings.null,
    paddingHorizontal: layoutConstants.spacing.paddings.null
  }
})
