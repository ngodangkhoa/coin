import React, { memo } from "react"
import { View, Text } from "react-native"

function Sell({ data }) {
  return (
    <View>
      <Text>{data}</Text>
    </View>
  )
}

export default memo(Sell)
