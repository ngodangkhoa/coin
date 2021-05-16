import React, { memo } from "react"
import { View, Text, FlatList, ViewStyle, Dimensions, TextStyle, ScrollView } from "react-native"

const { height } = Dimensions.get("window")

const LIST: ViewStyle = {
  height: height * 0.35,
}

const TITLE_BUY: TextStyle = {
  color: "green",
}

const TITLE: TextStyle = {
  color: "#BAB6C8",
  fontSize: 15,
  zIndex: 2,
  fontWeight: "500",
}

const ROW: ViewStyle = {
  flexDirection: "row",
  height: 25,
  justifyContent: "space-between",
  position: "relative",
  paddingTop: 3,
  marginHorizontal: 8,
  marginVertical: 5,
}

const CHART: ViewStyle = {
  height: 28,
  // width: 25,
  position: "absolute",
  zIndex: 1,
}

const SCROLL: ViewStyle = {
  height: "40%",
}

const CHART_SELL: ViewStyle = {
  backgroundColor: "#ff5722",
  opacity: 0.8,
}

const Item = ({ row }) => (
  <View style={ROW}>
    <Text style={TITLE}>{row[1]}</Text>
    <Text style={{ ...TITLE, ...TITLE_BUY }}>{row[2]}</Text>
    <View
      style={{
        ...CHART,
        ...CHART_SELL,
        ...{ width: (+row[2] / 2) * 1000 },
      }}
    ></View>
  </View>
)

function Buy({ data, backgroundColor }) {
  // const renderItem = ({ item }) => <Item row={item} />

  return (
    <View style={LIST}>
      {/* <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item.join(",")} /> */}
      <ScrollView style={SCROLL}>
        {data.map((b, index) => (
          <View style={ROW} key={`${b.join("")} ${index}`}>
            <Text style={TITLE}>{b[1]}</Text>
            <Text style={{ ...TITLE, ...TITLE_BUY }}>{b[2]}</Text>

            <View
              style={{
                ...CHART,
                ...CHART_SELL,
                ...{ backgroundColor },
                ...{ width: (+b[2] / 2) * 1000 },
              }}
            ></View>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

export default Buy
