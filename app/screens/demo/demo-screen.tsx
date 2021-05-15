import React, { useEffect, useState } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Header, Screen, Wallpaper } from "../../components"
import { color, spacing } from "../../theme"
// import useSocket from "./useSocket"
import Coin from "./Coin"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}

const BOLD: TextStyle = { fontWeight: "bold" }

const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}

let temp = ""

export const DemoScreen = observer(function DemoScreen() {
  const navigation = useNavigation()
  const goBack = () => navigation.goBack()
  const [dataBtc, setData] = useState("")
  let inteval = null

  const ws = new WebSocket("wss://ws-feed.pro.coinbase.com")

  useEffect(() => {
    ws.onopen = () => {
      // connection opened
      ws.send(
        JSON.stringify({
          type: "subscribe",
          channels: [{ name: "level2", product_ids: ["BTC-USDT"] }],
        }),
      ) // send a message
    }

    ws.onmessage = (e) => {
      temp = e.data
    }

    ws.onerror = (e) => {
      // an error occurred
      console.log("e--", e.message)
    }

    ws.onclose = (e) => {
      // connection closed
      console.log("close---", e.code, e.reason)
    }

    setReload()

    return () => {
      ws.close()
      clearInterval(inteval)
    }
  }, [])

  function setReload() {
    inteval = setInterval(() => {
      if (temp) {
        setData(temp)
      }
    }, 50)
  }

  return (
    <View testID="DemoScreen" style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Header
          headerTx="demoScreen.howTo"
          leftIcon="back"
          onLeftPress={goBack}
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />

        <Coin data={dataBtc} />
      </Screen>
    </View>
  )
})
