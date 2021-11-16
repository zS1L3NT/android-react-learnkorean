import Game from "../components/Games/Game"
import GameList from "../components/Games/GameList"
import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

const Stack = createNativeStackNavigator<iGamesStackParamList>()

const Games = (): JSX.Element => {
	return (
		<Stack.Navigator initialRouteName="GameList" screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Game" component={Game} />
			<Stack.Screen name="GameList" component={GameList} />
		</Stack.Navigator>
	)
}

export default Games
