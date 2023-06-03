/* eslint-disable react/no-array-index-key */
import React, { FC } from "react"
import { StyleSheet, View } from "react-native"
import SkeletonLoader from "expo-skeleton-loader"

const SkeletonLoaders: FC<SkeletonProps> = ({ number }) => (
  <View style={styles.container}>
    {Array(number || 1)
      .fill(undefined)
      .map((el, index) => (
        <SkeletonLoader
          key={`${index}-skeleton`}
          boneColor="rgba(0,0,0,0.2)"
          highlightColor="rgba(0,0,0,0.1)"
        >
          <SkeletonLoader.Container style={styles.mainContainer}>
            <SkeletonLoader.Item style={styles.height} />
            <SkeletonLoader.Container style={styles.rowWithImage}>
              <SkeletonLoader.Item style={styles.image} />
              <SkeletonLoader.Item style={{ height: 20, width: 100 }} />
            </SkeletonLoader.Container>
            <SkeletonLoader.Container style={styles.row}>
              <SkeletonLoader.Item style={{ height: 20, width: 200 }} />
              <SkeletonLoader.Item style={{ height: 20, width: 100 }} />
            </SkeletonLoader.Container>
            <SkeletonLoader.Item style={{ height: 20 }} />
          </SkeletonLoader.Container>
        </SkeletonLoader>
      ))}
  </View>
)

const styles = StyleSheet.create({
  container: {
    rowGap: 24
  },
  mainContainer: {
    flex: 1,
    rowGap: 16,
    overflow: "hidden",
    paddingVertical: 12
  },
  height: { height: 20 },
  rowWithImage: {
    flexDirection: "row",
    columnGap: 16,
    alignItems: "center"
  },
  image: { height: 32, width: 32, borderRadius: 100 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    columnGap: 16
  }
})

export default SkeletonLoaders
