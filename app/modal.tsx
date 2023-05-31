import { Stack, useRouter } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { IconButton, Text, TextInput } from "react-native-paper"
import { Formik } from "formik"
import {
  View,
  Platform,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView
} from "react-native"

import { PaperSelect } from "react-native-paper-select"

import Appointment from "@services/models/appointment"
import { useContext } from "react"
import AppStateContext from "@services/context"

export default function ModalScreen() {
  const { locale } = useContext(AppStateContext)
  const router = useRouter()

  return (
    <>
      <StatusBar style={Platform.OS === "ios" ? "dark" : "auto"} />
      <KeyboardAvoidingView
        style={styles.screen}
        contentContainerStyle={styles.screen}
      >
        <SafeAreaView style={styles.screen}>
          <View style={styles.container}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <Text variant="titleLarge">{locale.t("modal.title")}</Text>
              <IconButton icon="close" onPress={() => router.push("../")} />
            </View>
            <ScrollView style={styles.screen}>
              <Formik
                initialValues={Appointment}
                // validationSchema={validations.passwordResetValidationSchema}
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
                  <View style={styles.screen}>
                    <View />
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
  header: { shadowColor: "transparent" }
})
