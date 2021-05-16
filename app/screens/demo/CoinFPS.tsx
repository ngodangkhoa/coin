import React, { useEffect, useState, useCallback, memo } from "react"
import { Text, View, TextStyle, ViewStyle } from "react-native"
// import throttle from "lodash.throttle"
import FastList from "./FastList"

const TEXT: TextStyle = {
  color: "#fff",
  padding: 8,
  backgroundColor: "#9973F0",
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

const TITLE: TextStyle = {
  color: "#BAB6C8",
  fontSize: 15,
  zIndex: 2,
  fontWeight: "500",
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index
}

function CoinFPS() {
  const [dataBtc, setData] = useState([])
  const [dataBuy, setDatabuy] = useState([])

  const ws = new WebSocket("wss://ws-feed.pro.coinbase.com")

  let m = null

  const delayedQuery = () => {
    const btc = (JSON.parse(m) || { changes: [] }).changes
    if (!(btc && btc[0])) return

    function update(d) {
      return d
        .concat(btc)
        .map((x) => x.join(","))
        .filter(onlyUnique)
        .map((y) => y.split(","))
        .sort((a, b) => +b[1] - +a[1])
        .slice(0, 15)
    }
    if (btc[0][0] === "sell" && +btc[0][2] !== 0) {
      setData(update)
    } else if (btc[0][0] === "buy" && +btc[0][2] !== 0) {
      setDatabuy(update)
    }
  }

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
      // delayedQuery(JSON.parse(e.data))
      m = e.data
    }

    getBuffer()

    return () => {
      ws.close()
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [])
  let interval = null
  function getBuffer() {
    interval = setInterval(() => {
      delayedQuery()
    }, 50)
  }

  const total = React.useMemo(() => {
    if (dataBtc.length !== 0 && dataBuy.length !== 0) {
      return +dataBtc[dataBtc.length - 1][1] - +dataBuy[0][1]
    }
    return 0
  }, [dataBtc, dataBuy])

  return dataBtc.length !== 0 ? (
    <View>
      <View style={ROW}>
        <Text style={TITLE}>Price</Text>
        <Text style={TITLE}>Size</Text>
      </View>
      <FastList data={dataBtc} backgroundColor="#ff5722"/>
      <Text style={TEXT}>{total}</Text>
      <FastList data={dataBuy} backgroundColor="#3f51b5" />
    </View>
  ) : null
}

export default memo(CoinFPS)
