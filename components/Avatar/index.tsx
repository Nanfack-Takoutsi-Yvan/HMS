import { FC } from "react"
import { StyleSheet, View } from "react-native"
import { Avatar as PaperAvatar, Text } from "react-native-paper"

const Avatar: FC<AvatarProps> = ({ title, subtitle }) => (
  <View style={styles.container}>
    <PaperAvatar.Image
      size={36}
      source={require("../../assets/profile/doctor.webp")}
    />
    <View>
      <Text variant="bodyLarge"> {title} </Text>
      <Text variant="bodySmall"> {subtitle} </Text>
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 4
  }
})

export default Avatar
