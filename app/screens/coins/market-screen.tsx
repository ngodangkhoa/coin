import React from "react"
import { View, Image, ViewStyle, TextStyle, ImageStyle } from "react-native"
import { observer } from "mobx-react-lite"

import { Header, Screen, Text, Wallpaper } from "../../components"
import { color, spacing, typography } from "../../theme"
const bowserLogo = require("./bowser.png")

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}
const BOLD: TextStyle = { fontWeight: "bold" }
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[4] + spacing[1],
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}
const TITLE_WRAPPER: TextStyle = {
  ...TEXT,
  textAlign: "center",
}
const TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 28,
  lineHeight: 38,
  textAlign: "center",
}
const ALMOST: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 26,
  fontStyle: "italic",
}
const BOWSER: ImageStyle = {
  alignSelf: "center",
  marginVertical: spacing[5],
  maxWidth: "100%",
}
const CONTENT: TextStyle = {
  ...TEXT,
  color: "#BAB6C8",
  fontSize: 15,
  lineHeight: 22,
  marginBottom: spacing[5],
}

let dataBtcRender = ""
export const WelcomeScreen = observer(function WelcomeScreen() {
  const [dataBtc, setData] = React.useState("")
  let inteval = null

  React.useEffect(() => {
    const ws = new WebSocket("wss://ws-feed.pro.coinbase.com")

    ws.onopen = () => {
      // connection opened
      ws.send(
        JSON.stringify({
          type: "subscribe",
          product_ids: ["ETH-USD", "ETH-EUR"],
          channels: [
            "level2",
            "heartbeat",
            {
              name: "ticker",
              product_ids: ["ETH-BTC", "ETH-USD"],
            },
          ],
        }),
      ) // send a message
    }

    ws.onmessage = (e) => {
      // a message was received
      // console.log("data---", e.data)
      dataBtcRender = e.data
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
      clearInterval(inteval)
      ws.close()
    }
  }, [])

  function setReload() {
    inteval = setInterval(() => {
      if (dataBtcRender) {
        setData(dataBtcRender)
      }
    }, 500)
  }

  return (
    <View testID="WelcomeScreen" style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Header headerTx="welcomeScreen.poweredBy" style={HEADER} titleStyle={HEADER_TITLE} />
        <Text style={TITLE_WRAPPER}>
          <Text style={TITLE} text="Your new app, " />
          <Text style={ALMOST} text="almost" />
          <Text style={TITLE} text="!" />
        </Text>
        <Text style={TITLE} preset="header" tx="welcomeScreen.readyForLaunch" />
        <Image source={bowserLogo} style={BOWSER} />
        <Text style={CONTENT}>{dataBtc} </Text>
        <Text style={CONTENT}>
          For everyone else, this is where you'll see a live preview of your fully functioning app
          using Ignite.
        </Text>
      </Screen>
    </View>
  )
})
