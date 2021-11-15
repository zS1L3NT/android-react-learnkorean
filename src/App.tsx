import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native"
import React from "react"
import Games from "./pages/Games"
import Hanguls from "./pages/Hanguls"
import Lessons from "./pages/Lessons"

const Tab = createBottomTabNavigator()

const App = (): JSX.Element => {
	return (
		<NavigationContainer>
			<Tab.Navigator initialRouteName="Lessons" backBehavior="history">
				<Tab.Screen name="Lessons" component={Lessons} />
				<Tab.Screen name="Games" component={Games} />
				<Tab.Screen name="Hanguls" component={Hanguls} />
			</Tab.Navigator>
		</NavigationContainer>
	)
}

export default App
