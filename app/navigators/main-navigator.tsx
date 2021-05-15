/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { WelcomeScreen, DemoScreen } from "../screens"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type PrimaryParamList = {
  welcome: undefined
  demo: undefined
  demoList: undefined
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createStackNavigator<PrimaryParamList>()
const Tab = createBottomTabNavigator()

export function MainNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="welcome"
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
        activeBackgroundColor: "#482880",
        inactiveBackgroundColor: "#673ab7",
        style: {
          backgroundColor: "#673ab7",
          paddingBottom: 15,
        },
        labelStyle: {
          marginBottom: 23,
        },
      }}
    >
      <Stack.Screen name="welcome" component={WelcomeScreen} options={{ title: "Market" }} />
      <Stack.Screen name="demo" component={DemoScreen} options={{ title: "OrderBook" }} />
      {/* <Stack.Screen name="demoList" component={DemoListScreen} /> */}
    </Tab.Navigator>
  )
}

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["welcome"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
