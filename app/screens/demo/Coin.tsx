import React from "react"
import { View, Text, TextStyle, ViewStyle, ScrollView, Dimensions } from "react-native"

const { height } = Dimensions.get("screen")

const TITLE: TextStyle = {
  color: "#BAB6C8",
  fontSize: 15,
  zIndex: 2,
  fontWeight: "500",
}

const TITLE_: TextStyle = {
  color: "#BAB6C8",
  fontSize: 18,
  marginTop: 10,
  textAlign: "center",
}

const TITLE_SELL: TextStyle = {
  color: "red",
}

const TITLE_BUY: TextStyle = {
  color: "green",
}

const SCROLL: ViewStyle = {
  height: "40%",
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

const CHART_BUY: ViewStyle = {
  backgroundColor: "#3f51b5",
  opacity: 0.8,
}

const CHART_SELL: ViewStyle = {
  backgroundColor: "#ff5722",
  opacity: 0.8,
}

const CONTAINER: ViewStyle = {
  // borderWidth: 0.5,
  // backgroundColor: "#000",
  width: "100%",
  height: height * 0.8,
}

function Coin({ data }) {
  const [coinSell, setCoinSell] = React.useState([
    // ["50620.59", "0.00590442", "2021-05-14T10:15:47.814349Z"],
  ])
  const [coinBuy, setCoinBuy] = React.useState([])

  React.useEffect(() => {
    if (data) {
      const { changes, time } = data && JSON.parse(data)
      if (!changes || +changes[0][2] === 0 || +changes[0][1] === 0) {
        return
      }

      if (changes[0][0] === "sell") {
        const coin = coinSell.slice()
        if (coin.length > 15 || +changes[0][2] === 0 || +changes[0][1] === 0) {
          coin.shift()
        }
        coin.push([changes[0][1], changes[0][2], time])
        setCoinSell(
          coin.sort(function (a, b) {
            return +b[0] - +a[0]
          }),
        )
      } else {
        const coin = coinBuy.slice()
        if (coin.length > 15 || +changes[0][2] === 0 || +changes[0][1] === 0) {
          coin.shift()
        }
        coin.push([changes[0][1], changes[0][2], time])
        setCoinBuy(
          coin.sort(function (a, b) {
            return +b[0] - +a[0]
          }),
        )
      }
    }
  }, [data])

  return (
    <View style={CONTAINER}>
      <View style={ROW}>
        <Text style={TITLE}>Price</Text>
        <Text style={TITLE}>Size</Text>
      </View>
      <Text style={TITLE_}>Sell</Text>
      <ScrollView style={SCROLL}>
        {coinSell.map((c, index) => (
          <View style={ROW} key={`${c[2]}-${c[0]}-${c[1]} ${index}`}>
            <Text style={TITLE}>{c[0]}</Text>
            <Text style={{ ...TITLE, ...TITLE_SELL }}>{c[1]}</Text>
            <View
              style={{
                ...CHART,
                ...CHART_SELL,
                ...{ width: (+c[1] / 2) * 800 },
              }}
            ></View>
          </View>
        ))}
      </ScrollView>

      <Text style={TITLE_}>Buy</Text>
      <ScrollView style={SCROLL}>
        {coinBuy.map((b, index) => (
          <View style={ROW} key={`${b[2]}-${b[0]}-${b[1]} ${index}`}>
            <Text style={TITLE}>{b[0]}</Text>
            <Text style={{ ...TITLE, ...TITLE_BUY }}>{b[1]}</Text>

            <View
              style={{
                ...CHART,
                ...CHART_BUY,
                ...{ width: (+b[1] / 2) * 800 },
              }}
            ></View>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

export default React.memo(Coin)
