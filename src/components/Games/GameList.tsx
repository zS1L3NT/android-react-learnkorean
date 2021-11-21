import React, { useCallback, useEffect } from "react"
import { Games as games } from "../../data.json"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native"
import { setTitle } from "../../actions/TitleActions"
import { Text } from "react-native-magnus"
import { useDispatch, useSelector } from "react-redux"
import { useIsFocused } from "@react-navigation/native"

type Props = NativeStackScreenProps<iGamesStackParamList, "GameList">

const GameList = (props: Props): JSX.Element => {
	//#region Hooks
	const dispatch = useDispatch()
	const isFocused = useIsFocused()
	const progress = useSelector(state => state.games)
	//#endregion

	//#region Effects
	useEffect(() => {
		if (isFocused) {
			dispatch(setTitle("Memory Games"))
		}
	}, [isFocused])
	//#endregion

	//#region Functions
	const getBackgroundColor = useCallback(
		(title: string) => {
			if (progress[title].completed) {
				return "#c6f6d5"
			}
			if (progress[title].highest !== null || Object.keys(progress[title].qna).length > 0) {
				return "#fefcbf"
			}
			return "#fed7d7"
		},
		[progress]
	)

	const handleTitle = (title: keyof typeof games) => {
		props.navigation.push("Game", { game: games[title], title })
		dispatch(setTitle(title))
	}
	//#endregion

	return (
		<SafeAreaView>
			<ScrollView>
				{(Object.keys(games) as (keyof typeof games)[]).map((title, i) => (
					<View key={title}>
						<TouchableOpacity
							style={[
								styles.touchable,
								{ backgroundColor: getBackgroundColor(title) },
								{ marginBottom: i === 18 ? 10 : 0 }
							]}
							onPress={() => handleTitle(title)}>
							<Text>{title}</Text>
						</TouchableOpacity>
					</View>
				))}
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	touchable: {
		padding: 20,
		marginTop: 8,
		marginStart: 10,
		marginEnd: 10,
		borderRadius: 10,
		backgroundColor: "#fefefe"
	}
})

export default GameList
