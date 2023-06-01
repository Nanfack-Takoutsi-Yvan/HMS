import { StatusBar } from "expo-status-bar"
import {
  Platform,
  StyleSheet,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView
} from "react-native"
import { IconButton, Text, Button, useTheme } from "react-native-paper"
import {
  RichTextEditor,
  ActionMap,
  ActionKey,
  RichTextToolbar
} from "@siposdani87/expo-rich-text-editor"
import { useContext, useState } from "react"
import { useRouter } from "expo-router"
import Icon from "react-native-paper/src/components/Icon"
import useKeyboardVisible from "@hooks/keyboard/useKeyboardVisible"
import AppStateContext from "@services/context"

export default function ModalScreen() {
  const [value, setValue] = useState<string>("")
  const [selectedActions, setSelectedActions] = useState<ActionKey[]>([])

  const router = useRouter()
  const { colors } = useTheme()
  const { isKeyboardVisible } = useKeyboardVisible()
  const { locale } = useContext(AppStateContext)

  const getActionMap = () => ({
    [ActionKey.bold]: ({ selected }: { selected: boolean }) => (
      <View style={[styles.toolbarAction, selected && styles.actionSelected]}>
        <Icon source="format-bold" size={24} />
      </View>
    ),
    [ActionKey.italic]: ({ selected }: { selected: boolean }) => (
      <View style={[styles.toolbarAction, selected && styles.actionSelected]}>
        <Icon source="format-italic" size={24} />
      </View>
    ),
    [ActionKey.unorderedList]: ({ selected }: { selected: boolean }) => (
      <View style={[styles.toolbarAction, selected && styles.actionSelected]}>
        <Icon source="format-list-bulleted" size={24} />
      </View>
    )
  })

  const handleActionsKeys = (key: ActionKey) => {
    if (selectedActions.includes(key)) {
      setSelectedActions(oldValue => oldValue.filter(el => el !== key))
    } else {
      setSelectedActions(oldValue => [...oldValue, key])
    }
  }

  const onValueChange = (v: string): void => {
    console.log("onValueChange", v)
    setValue(v)
  }

  return (
    <View style={styles.container}>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      <SafeAreaView style={styles.screen}>
        <View style={styles.screen}>
          <View style={styles.editorContainer}>
            <Text variant="titleLarge">{locale.t("consign.title")}</Text>
            <IconButton icon="close" onPress={() => router.push("../")} />
          </View>
          <KeyboardAvoidingView
            style={styles.screen}
            contentContainerStyle={styles.screen}
            behavior={Platform.OS === "ios" ? "height" : undefined}
          >
            <View style={styles.screen}>
              <ScrollView
                style={styles.screen}
                contentContainerStyle={styles.padding}
              >
                <View style={styles.screen}>
                  <RichTextEditor
                    minHeight={150}
                    value={value}
                    selectionColor={colors.primary}
                    onValueChange={onValueChange}
                    editorStyle={styles.editor}
                    actionMap={getActionMap() as unknown as ActionMap}
                  />
                </View>
              </ScrollView>

              {isKeyboardVisible && (
                <View style={styles.toolbarContainer}>
                  <RichTextToolbar
                    actionMap={getActionMap() as unknown as ActionMap}
                    selectedActionKeys={selectedActions}
                    onPress={handleActionsKeys}
                    style={styles.toolbar}
                  />
                  <Button mode="text" onPress={() => undefined}>
                    {locale.t("consign.save")}
                  </Button>
                </View>
              )}
            </View>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  padding: {
    flex: 1,
    paddingHorizontal: 12,
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
  editorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 14,
    paddingHorizontal: 12
  },
  editor: {
    fontSize: 16
  },
  toolbarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(230,230,230, 0.5)",
    paddingHorizontal: 12
  },
  toolbar: {
    alignItems: "baseline",
    flexDirection: "row",
    flex: 1,
    rowGap: 4
  },
  toolbarAction: {
    minHeight: 36,
    minWidth: 36,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center"
  },
  actionSelected: {
    backgroundColor: "rgb(220,220,220)"
  }
})
