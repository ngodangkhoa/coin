import React, { useState } from "react"
import {
  TextStyle,
  View,
  ViewStyle,
  TouchableOpacity,
  LayoutAnimation,
  Text,
  UIManager,
  Platform,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Header, Screen, Wallpaper } from "../../components"
import { color, spacing } from "../../theme"

import CoinFPS from "./CoinFPS"
import RightMenu from "./RightMenu"

const FULL: ViewStyle = { flex: 1, height: "100%" }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
  height: "100%",
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

const BUTTON: ViewStyle = {
  height: 38,
  backgroundColor: "#3f51b5",
  borderRadius: 5,
  marginBottom: 15,
  justifyContent: "center",
  marginHorizontal: 10,
}

const BUTTON_TITILE: TextStyle = {
  color: "#fff",
  textAlign: "center",
}

const ROOT: ViewStyle = {
  flexDirection: "row",
}

const RIGHT_SIDE: ViewStyle = {
  flex: 1,
}

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
  }
}

export const DemoScreen = observer(function DemoScreen() {
  const navigation = useNavigation()
  const goBack = () => navigation.goBack()
  const [expanded, setExpanded] = useState(false)

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
        <TouchableOpacity
          style={BUTTON}
          onPress={() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
            setExpanded(!expanded)
          }}
        >
          <Text style={BUTTON_TITILE}>Transition layout</Text>
        </TouchableOpacity>
        <View style={ROOT}>
          <View style={RIGHT_SIDE}>
            <CoinFPS />
          </View>

          {expanded && <RightMenu />}
        </View>
      </Screen>
    </View>
  )
})
