import React, { useCallback, useEffect, useState } from "react"
import { Games as games } from "../../data.json"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native"
import { setTitle } from "../../actions/TitleActions"
import { Div, Overlay, Text } from "react-native-magnus"
import { useDispatch, useSelector } from "react-redux"
import { useIsFocused } from "@react-navigation/native"
import { clearGameAnswers } from "../../actions/GamesActions"

type Props = NativeStackScreenProps<iGamesStackParamList, "GameList">

const GameList = (props: Props): JSX.Element => {
	//#region Hooks
	const dispatch = useDispatch()
	const isFocused = useIsFocused()
	const progress = useSelector(state => state.games)
	const [choice, setChoice] = useState<keyof typeof games | null>(null)
	const [lockedOverlayVisible, setLockedOverlayVisible] = useState(false)
	const [incompleteOverlayVisible, setIncompleteOverlayVisible] = useState(false)
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
		(title: keyof typeof games) => {
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

	const handleGame = (title: keyof typeof games) => {
		console.log("GAME")

		const gameList = Object.keys(progress)
		const gameIndex = gameList.indexOf(title)
		const previousProgress = gameIndex > 0 ? progress[gameList[gameIndex - 1]] : null

		if (!previousProgress || previousProgress.completed) {
			if (Object.keys(progress[title].qna).length === 0) {
				props.navigation.push("Game", { game: games[title], title })
				dispatch(setTitle(title))
			} else {
				setChoice(title)
				setIncompleteOverlayVisible(true)
			}
		} else {
			setLockedOverlayVisible(true)
		}
	}

	const handleOverlayRestart = (title: keyof typeof games) => {
		hideIncompleteOverlay()
		dispatch(clearGameAnswers(title))
		console.log(`Cleared game progress (${title})`)

		props.navigation.push("Game", { game: games[title], title })
	}

	const handleOverlayContinue = (title: keyof typeof games) => {
		hideIncompleteOverlay()

		props.navigation.push("Game", { game: games[title], title })
	}

	const hideLockedOverlay = () => {
		setLockedOverlayVisible(false)
	}

	const hideIncompleteOverlay = () => {
		setChoice(null)
		setIncompleteOverlayVisible(false)
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
							onPress={() => handleGame(title)}>
							<Text textAlign="left">{title}</Text>
						</TouchableOpacity>
					</View>
				))}
			</ScrollView>
			<Overlay visible={lockedOverlayVisible} onBackdropPress={hideLockedOverlay}>
				<Text fontSize="lg" mb="md">
					Game locked!
				</Text>
				<Text>Complete previous game to unlock this game first!</Text>
				<Text color="red500" mt="xl" onPress={hideLockedOverlay}>
					Ok
				</Text>
			</Overlay>
			<Overlay visible={incompleteOverlayVisible} onBackdropPress={hideIncompleteOverlay}>
				<Text fontSize="lg" mb="md">
					Quiz Incomplete!
				</Text>
				<Text>
					{"Do you want to "}
					<Text fontWeight="bold">restart your progress</Text>
					{" or "}
					<Text fontWeight="bold">continue the quiz</Text>
					{"?"}
				</Text>
				<Div justifyContent="space-evenly" mt="xl" row>
					<Text color="red500" onPress={() => handleOverlayRestart(choice!)}>
						Restart
					</Text>
					<Text color="green500" onPress={() => handleOverlayContinue(choice!)}>
						Continue
					</Text>
				</Div>
			</Overlay>
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
