import { Stack, useRouter } from "expo-router"
import { StatusBar } from "expo-status-bar"
import {
  Button,
  IconButton,
  Switch,
  Text,
  TextInput,
  useTheme
} from "react-native-paper"
import { Formik } from "formik"
import {
  View,
  Platform,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Pressable
} from "react-native"

import Appointment from "@services/models/appointment"
import { useContext, useState } from "react"
import AppStateContext from "@services/context"
import CalendarDays from "@components/CalendarDays"
import { DATE_FORMAT } from "@components/CalendarDays/__index.utils"
import DateInput from "@components/DateInput/index"
import {
  MultipleSelectList,
  SelectList
} from "react-native-dropdown-select-list"
import Icon from "react-native-paper/src/components/Icon"

export default function ModalScreen() {
  const [categories, setCategories] = useState([])

  const { locale } = useContext(AppStateContext)
  const { colors } = useTheme()
  const router = useRouter()

  const data = [
    { key: "onSite", value: locale.t("availabilities.onSite") },
    { key: "remote", value: locale.t("availabilities.remote") }
  ]

  const data2 = [
    { key: "Canada", value: "Canada" },
    { key: "England", value: "England" },
    { key: "Pakistan", value: "Pakistan" },
    { key: "India", value: "India" },
    { key: "NewZealand", value: "NewZealand" }
  ]

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
              <IconButton icon="close" onPress={() => router.push("../")} />
            </View>
            <ScrollView
              style={styles.screen}
              showsVerticalScrollIndicator={false}
            >
              <Formik
                initialValues={new Appointment()}
                onSubmit={() => undefined}
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
                    <View style={styles.consignView}>
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
                        defaultOption={data[0]}
                        arrowicon={<Icon source="chevron-down" size={24} />}
                        boxStyles={styles.selectInput}
                        dropdownStyles={styles.dropDown}
                        dropdownItemStyles={styles.dropDownItem}
                      />
                    </View>

                    <View style={styles.consignView}>
                      <View>
                        <Text variant="labelSmall">
                          {locale.t("modal.consultancyLocation")}
                        </Text>
                      </View>
                      <MultipleSelectList
                        setSelected={() => null}
                        data={data}
                        save="key"
                        arrowicon={<Icon source="chevron-down" size={24} />}
                        boxStyles={styles.multipleSelectInput}
                        dropdownStyles={styles.dropDown}
                        dropdownItemStyles={styles.dropDownItem}
                        placeholder="select location"
                        badgeStyles={{
                          backgroundColor: colors.primary,
                          borderRadius: 6
                        }}
                      />
                    </View>

                    <View style={styles.consignView}>
                      <View>
                        <Text variant="titleMedium">
                          {locale.t("modal.consign")}
                        </Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Pressable
                          onPress={() => router.push("consign")}
                          style={styles.days}
                        >
                          <Text
                            numberOfLines={2}
                            ellipsizeMode="tail"
                            variant="labelLarge"
                          >
                            {locale.t("modal.consignPlaceholder")}
                          </Text>
                        </Pressable>
                      </View>
                    </View>

                    <View style={{ rowGap: 4 }}>
                      <View style={styles.switchSection}>
                        <Text variant="titleMedium">
                          {locale.t("modal.switchSectionTitle")}
                        </Text>
                        <Switch
                          value={`${values.activate}` !== "false"}
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
                          dense
                        />
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
    paddingVertical: 12
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
    height: 75
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
