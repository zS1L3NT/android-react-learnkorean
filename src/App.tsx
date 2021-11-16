import Games from "./pages/Games"
import Hanguls from "./pages/Hanguls"
import Lessons from "./pages/Lessons"
import React, { createContext, useState } from "react"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { NavigationContainer } from "@react-navigation/native"
import { ThemeProvider } from "react-native-magnus"

const Drawer = createDrawerNavigator<iRootDrawerParamList>()
export const SetTitleContext = createContext<(title: string) => void>(() => {})

const App = (): JSX.Element => {
	const [title, setTitle] = useState("Learn Korean")

	return (
		<ThemeProvider>
			<SetTitleContext.Provider value={setTitle}>
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
			</SetTitleContext.Provider>
		</ThemeProvider>
	)
}

export default App
