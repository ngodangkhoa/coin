import React, { useState } from "react"
import { View, Text, TextInput, ViewStyle, TextStyle, Dimensions } from "react-native"

const { height } = Dimensions.get("window")

const INPUT_WRAP: ViewStyle = {
  borderColor: "#fff",
  borderWidth: 1,
  padding: 3,
  flexDirection: "row",
  marginBottom: 10,
  justifyContent: "space-between",
  alignItems: "center",
  height: 50,
}

const LEFT_SIDE: ViewStyle = {
  flex: 1,
  backgroundColor: "#2a3eb1",
  height: height * 0.8,
}

const INPUT: TextStyle = {
  width: "50%",
  color: "#fff",
  textAlign: "center",
}

const TEXT: TextStyle = {
  color: "#fff",
}

function RightMenu() {
  const [quantity, setQuantity] = useState("")
  const [price, setPrice] = useState("")

  return (
    <View style={LEFT_SIDE}>
      <View style={INPUT_WRAP}>
        <Text style={TEXT}>Quantity</Text>
        <TextInput style={INPUT} value={quantity} onChangeText={(text) => setQuantity(text)} />
        <Text style={TEXT}>BTC</Text>
      </View>
      <View style={INPUT_WRAP}>
        <Text style={TEXT}>Price</Text>
        <TextInput style={INPUT} value={price} onChangeText={(text) => setPrice(text)} />
        <Text style={TEXT}>USDC</Text>
      </View>
      <View style={INPUT_WRAP}>
        <Text style={TEXT}>Total</Text>
        <Text style={TEXT}>{+quantity * +price}</Text>
        <Text style={TEXT}>USDC</Text>
      </View>
    </View>
  )
}

export default RightMenu
