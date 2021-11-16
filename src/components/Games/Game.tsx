import React from "react"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { SafeAreaView } from "react-native"

type Props = NativeStackScreenProps<iGamesStackParamList, "Game">

const Game = (props: Props): JSX.Element => {
	const { game } = props.route.params

	return <SafeAreaView></SafeAreaView>
}

export default Game
