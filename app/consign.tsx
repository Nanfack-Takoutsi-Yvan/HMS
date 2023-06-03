import { StatusBar } from "expo-status-bar"
import {
  Platform,
  StyleSheet,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView
} from "react-native"
import { Button, IconButton, Text, useTheme } from "react-native-paper"
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor"

import { useContext, useEffect, useRef, useState } from "react"
import { useRouter, useLocalSearchParams } from "expo-router"
import AppStateContext from "@services/context"

export default function ModalScreen() {
  const [value, setValue] = useState<string>("")
  const richText = useRef<RichEditor>(null)

  const router = useRouter()
  const { colors } = useTheme()
  const { locale } = useContext(AppStateContext)
  const params = useLocalSearchParams() as { consign: string }

  useEffect(() => {
    if (params.consign) {
      setValue(params.consign)
    }
  }, [params])

  return (
    <View style={styles.screen}>
      <StatusBar style={Platform.OS === "ios" ? "dark" : "auto"} />
      <SafeAreaView style={styles.screen}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.screen}
          contentContainerStyle={styles.screen}
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <Text variant="titleLarge">{locale.t("consign.title")}</Text>
              <IconButton
                icon="close"
                onPress={() => {
                  router.back()
                  setValue("")
                }}
              />
            </View>
            <ScrollView style={styles.screen}>
              <View style={styles.screen}>
                <RichEditor
                  ref={richText}
                  style={styles.screen}
                  containerStyle={styles.screen}
                  onChange={setValue}
                  editorStyle={{ caretColor: colors.primary }}
                  initialFocus
                  initialContentHTML={value}
                  placeholder={locale.t("consign.title")}
                />
              </View>
            </ScrollView>
          </View>
          <View style={styles.toolbarContainer}>
            <RichToolbar
              editor={richText}
              actions={[
                actions.setBold,
                actions.setItalic,
                actions.setUnderline,
                actions.insertBulletsList
              ]}
              style={styles.toolbar}
            />
            <Button
              onPress={() => {
                router.push({ pathname: "modal", params: { consign: value } })
                setValue("")
              }}
              mode="text"
            >
              {locale.t("consign.save")}
            </Button>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: Platform.OS === "ios" ? 12 : 24
  },
  screen: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  toolbar: {
    backgroundColor: "transparent"
  },
  toolbarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 4,
    backgroundColor: "rgba(30, 30, 30, 0.1)"
  }
})
