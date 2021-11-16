import Games from "./pages/Games"
import Hanguls from "./pages/Hanguls"
import Lessons from "./pages/Lessons"
import React from "react"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { NavigationContainer } from "@react-navigation/native"
import { ThemeProvider } from "react-native-magnus"

const Drawer = createDrawerNavigator<iRootDrawerParamList>()

const App = (): JSX.Element => {
	return (
		<ThemeProvider>
			<NavigationContainer>
				<Drawer.Navigator initialRouteName="Lessons" backBehavior="history">
					<Drawer.Screen name="Lessons" component={Lessons} />
					<Drawer.Screen name="Memory Games" component={Games} />
					<Drawer.Screen name="Learning to Read" component={Hanguls} />
				</Drawer.Navigator>
			</NavigationContainer>
		</ThemeProvider>
	)
}

export default App
