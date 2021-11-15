import { createDrawerNavigator } from "@react-navigation/drawer"
import { NavigationContainer } from "@react-navigation/native"
import React from "react"
import { ThemeProvider } from "react-native-magnus"
import GameList from "./pages/GameList"
import HangulList from "./pages/HangulList"
import LessonList from "./pages/LessonList"

const Drawer = createDrawerNavigator<RootDrawerParamList>()

const App = (): JSX.Element => {
	return (
		<ThemeProvider>
			<NavigationContainer>
				<Drawer.Navigator initialRouteName="Lessons" backBehavior="history">
					<Drawer.Screen name="Lessons" component={LessonList} />
					<Drawer.Screen name="Memory Games" component={GameList} />
					<Drawer.Screen name="Learning to Read" component={HangulList} />
				</Drawer.Navigator>
			</NavigationContainer>
		</ThemeProvider>
	)
}

export default App
