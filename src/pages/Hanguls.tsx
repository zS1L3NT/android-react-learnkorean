import Hangul from "../components/Hanguls/Hangul"
import HangulList from "../components/Hanguls/HangulList"
import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

const Stack = createNativeStackNavigator<iHangulsStackParamList>()

const Hanguls = (): JSX.Element => {
	return (
		<Stack.Navigator initialRouteName="HangulList" screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Hangul" component={Hangul} />
			<Stack.Screen name="HangulList" component={HangulList} />
		</Stack.Navigator>
	)
}

export default Hanguls
