import { useEffect } from "react"

function useSocket() {
  const ws = new WebSocket("wss://ws-feed.pro.coinbase.com")
  let d = ""

  useEffect(() => {
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
      d = e.data
    }

    ws.onerror = (e) => {
      // an error occurred
      console.log("e--", e.message)
    }

    ws.onclose = (e) => {
      // connection closed
      console.log("close---", e.code, e.reason)
    }

    return () => {
      ws.close()
    }
  }, [])

  return d
}

export default useSocket
