import Games from "./pages/Games"
import Hanguls from "./pages/Hanguls"
import Lessons from "./pages/Lessons"
import React from "react"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { NavigationContainer } from "@react-navigation/native"
import { useSelector } from "react-redux"

const Drawer = createDrawerNavigator<iRootDrawerParamList>()

const App = (): JSX.Element => {
	//#region Hooks
	const title = useSelector(state => state.title)
	//#endregion

	return (
		<NavigationContainer>
			<Drawer.Navigator
				initialRouteName="Lessons"
				backBehavior="history"
				screenOptions={{ headerTitle: title }}>
				<Drawer.Screen name="Lessons" component={Lessons} />
				<Drawer.Screen name="Memory Games" component={Games} />
				<Drawer.Screen name="Learning to Read" component={Hanguls} />
			</Drawer.Navigator>
		</NavigationContainer>
	)
}

export default App
