import { Stack, useRouter } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { Button, IconButton, Switch, Text, TextInput } from "react-native-paper"
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
import { useContext } from "react"
import AppStateContext from "@services/context"
import CalendarDays from "@components/CalendarDays"
import { DATE_FORMAT } from "@components/CalendarDays/__index.utils"

export default function ModalScreen() {
  const { locale } = useContext(AppStateContext)
  const router = useRouter()

  const data = [
    { key: "1", value: "À Distance" },
    { key: "2", value: "Présentiel" }
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
                  <View style={[styles.screen, { rowGap: 24 }]}>
                    <View
                      style={{
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: "rgba(0,0,0,0.08)",
                        paddingHorizontal: 16,
                        rowGap: 2
                      }}
                    >
                      <View>
                        <Text variant="titleMedium">Consigne</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Pressable
                          onPress={() => router.push("consign")}
                          style={{
                            flex: 1,
                            height: 75
                          }}
                        >
                          <Text
                            numberOfLines={2}
                            ellipsizeMode="tail"
                            variant="labelLarge"
                          >
                            Entrez votre texte
                          </Text>
                        </Pressable>
                      </View>
                    </View>

                    <View style={{ rowGap: 4 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center"
                        }}
                      >
                        <Text variant="titleMedium">
                          Activer les rendez vous
                        </Text>
                        <Switch />
                      </View>
                      <Text variant="bodySmall">
                        Durée de 20 mins vec 20 mins de pause apres 6 patients
                      </Text>
                    </View>

                    <View style={{ rowGap: 12 }}>
                      <View>
                        <Text variant="titleMedium">
                          Choisir les jours de consultation
                        </Text>
                      </View>
                      <View>
                        <CalendarDays
                          elementStyle={{
                            flex: 1,
                            height: 50,
                            borderRadius: 13
                          }}
                          format={DATE_FORMAT.LONG}
                        />
                      </View>
                    </View>

                    <View>
                      <View>
                        <Text>Choisir la plage horaite de consultation</Text>
                      </View>
                      <View>
                        <View>
                          <Text>Debut</Text>
                        </View>
                        <View>
                          <Text>Fin</Text>
                        </View>
                      </View>
                    </View>

                    <View style={{ rowGap: 12 }}>
                      <View>
                        <Text variant="titleMedium">
                          Cout de la consultation
                        </Text>
                      </View>
                      <View>
                        <TextInput
                          placeholder="Montant"
                          onChangeText={handleChange("price")}
                          onBlur={handleBlur("price")}
                          value={values.price.toString()}
                          keyboardType="numeric"
                          right={<TextInput.Affix text="xaf" />}
                          dense
                        />
                      </View>
                    </View>

                    <View>
                      <Button
                        mode="contained"
                        onPress={() => console.log("Pressed")}
                        style={{
                          borderRadius: 5
                        }}
                      >
                        Valider
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
  header: { shadowColor: "transparent" }
})
