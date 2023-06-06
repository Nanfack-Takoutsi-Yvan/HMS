/* eslint-disable import/prefer-default-export */
/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { View as DefaultView, ViewProps } from "react-native"
import { useTheme } from "react-native-paper/src/core/theming"

export function View({ style, ...otherProps }: ViewProps) {
  const { colors } = useTheme()

  return (
    <DefaultView
      style={[{ backgroundColor: colors.background }, style]}
      {...otherProps}
    />
  )
}
