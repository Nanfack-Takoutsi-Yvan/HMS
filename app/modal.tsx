import { useLocalSearchParams, useRouter } from "expo-router"
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

import Appointment from "@services/models/appointment"
import { useContext, useEffect, useState } from "react"
import AppStateContext from "@services/context"
import CalendarDays from "@components/CalendarDays"
import { DATE_FORMAT } from "@components/CalendarDays/__index.utils"
import DateInput from "@components/DateInput/index"
import {
  MultipleSelectList,
  SelectList
} from "react-native-dropdown-select-list"
import Icon from "react-native-paper/src/components/Icon"
import { RichTextViewer } from "@siposdani87/expo-rich-text-editor"
import createAppointmentSchema from "@services/validation/createAppointmentSchema"
import * as Haptics from "expo-haptics"

export default function ModalScreen() {
  const [selected, setSelected] = useState([])

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
                          arrowicon={<Icon source="chevron-down" size={24} />}
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
                          setSelected={(val: any) => {
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
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "android" ? 24 : 12,
    paddingBottom: 12
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%"
  },
  iconButton: { marginRight: 15 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  form: {
    rowGap: 24,
    flex: 1
  },
  consignView: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
    paddingHorizontal: 16,
    rowGap: 2
  },
  days: {
    flex: 1,
    height: 75,
    overflow: "hidden",
    paddingBottom: 8
  },
  switchSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  dayTile: {
    flex: 1,
    height: 50,
    borderRadius: 13
  },
  field: {
    backgroundColor: "#fff"
  },
  fieldOutline: {
    borderWidth: 1
  },
  button: {
    borderRadius: 5
  },
  selectInput: {
    borderColor: "transparent",
    paddingHorizontal: 0
  },
  dropDown: {
    borderColor: "transparent",
    borderTopColor: "rgba(30,30,30,0.1)",
    borderRadius: 0
  },
  dropDownItem: {
    paddingHorizontal: 0
  },
  multipleSelectInput: {
    borderColor: "transparent",
    paddingHorizontal: 0,
    padding: 0
  }
})
