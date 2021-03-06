import Animated from "react-native-reanimated"
import equal from "deep-equal"
import React, { useCallback, useEffect, useState } from "react"
import { Button, Div, Overlay, Text } from "react-native-magnus"
import {
	clearGameAnswers,
	setGameAnswers,
	setGameCompleted,
	setGameHighest
} from "../../actions/GamesActions"
import { LayoutAnimation, Platform, SafeAreaView, UIManager } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { setTitle } from "../../actions/TitleActions"
import { useDispatch, useSelector } from "react-redux"
import { useIsFocused } from "@react-navigation/native"

type Props = NativeStackScreenProps<iGamesStackParamList, "Game">

const Game = (props: Props): JSX.Element => {
	const { game, title } = props.route.params

	//#region Hooks
	const dispatch = useDispatch()
	const isFocused = useIsFocused()
	const progress = useSelector(state => state.games[title].qna)
	const [qna, setQNA] = useState<Record<string, string>>()
	const [order, setOrder] = useState<string[]>([]) // order of questions to display
	const [options, setOptions] = useState<string[]>() // current question options
	const [choice, setChoice] = useState<string | null>(null) // current question user's selection
	//#endregion

	//#region Effects
	useEffect(() => {
		if (Platform.OS === "android") {
			UIManager.setLayoutAnimationEnabledExperimental(true)
		}
	}, [])

	useEffect(() => {
		if (isFocused) {
			dispatch(setTitle("Lesson Quiz"))
		}
	}, [isFocused])

	useEffect(() => {
		if (!qna && progress) {
			// If qna is unset and previous progress exists
			// Should only run once
			const unanswered = Object.keys(game.qna).filter(q => !(q in progress))
			setOrder(unanswered.sort(() => Math.random() - 0.5))

			LayoutAnimation.configureNext(
				LayoutAnimation.create(
					250,
					LayoutAnimation.Types.easeInEaseOut,
					LayoutAnimation.Properties.opacity
				)
			)
			setQNA(progress)
		}
	}, [qna, progress])

	useEffect(() => {
		if (qna) {
			if (Object.keys(qna).length === Object.keys(game.qna).length) {
				// If all questions answered, regardless if correct or wrong
				dispatch(clearGameAnswers(title))
				console.log(`Cleared game progress (${title})`)

				if (equal(qna, game.qna)) {
					// If all questions are correct
					dispatch(setGameCompleted(title))
					console.log(`Set game complete (${title})`)
				}
			} else {
				// Not all questions answered yet, save progress
				dispatch(setGameAnswers(title, qna))
				console.log(`Saving game progress (${title})`, qna)
			}
		}
	}, [qna])

	useEffect(() => {
		if (order.length === 0) return

		const optionsShown = [game.qna[order[0]]]
		const optionsLeft = game.options.slice()

		for (let i = 0; i < 3; i++) {
			optionsLeft.splice(optionsLeft.indexOf(optionsShown.slice(-1)[0]!), 1)
			optionsShown.push(optionsLeft[Math.floor(Math.random() * optionsLeft.length)])
		}

		optionsShown.sort(() => Math.random() - 0.5)
		setOptions(optionsShown)
	}, [order])
	//#endregion

	//#region Functions
	const getOptionBackground = useCallback(
		(option: string) => {
			const answer = game.qna[order[0]]
			if (choice !== null) {
				if (choice === option) {
					if (choice === answer) {
						return "green200"
					} else {
						return "red200"
					}
				}

				if (option === answer) {
					return "green200"
				}
			}
			return "white"
		},
		[choice, order]
	)

	const getScore = useCallback(() => {
		let score = 0
		for (const question in qna) {
			if (qna[question] === game.qna[question]) {
				score++
			}
		}

		return score
	}, [qna])

	const handleOption = (option: string) => {
		LayoutAnimation.configureNext(
			LayoutAnimation.create(
				250,
				LayoutAnimation.Types.easeInEaseOut,
				LayoutAnimation.Properties.opacity
			)
		)

		setChoice(option)
		setQNA(prev => ({
			...prev,
			[order[0]]: option
		}))
	}

	const handleContinue = () => {
		LayoutAnimation.configureNext(
			LayoutAnimation.create(
				250,
				LayoutAnimation.Types.easeInEaseOut,
				LayoutAnimation.Properties.opacity
			)
		)

		setChoice(null)
		setOrder(order => order.slice(1, order.length))
	}

	const handleExit = () => {
		dispatch(setGameHighest(title, getScore()))
		props.navigation.navigate("GameList")
	}
	//#endregion

	return (
		<SafeAreaView>
			<Animated.View>
				<Div justifyContent="center" h="90%">
					<Div alignSelf="center" bg="white" w="90%" mb="xl" shadow="sm" rounded="xl">
						<Text fontSize="md" fontWeight="300" m="md" mb="xl" opacity={0.4}>
							Q{Object.keys(game.qna).length - order.length + 1}/
							{Object.keys(game.qna).length}
						</Text>
						<Text fontSize="lg" m="md" mb="lg">
							{order[0]}
						</Text>
					</Div>
					<Div alignSelf="center" w="90%">
						{options?.map(option => (
							<Button
								key={option}
								w="100%"
								mt="lg"
								bg={getOptionBackground(option)}
								rounded="xl"
								textAlign="center"
								alignSelf="center"
								disabled={choice !== null}
								onPress={() => handleOption(option)}>
								<Text color="grey">{option}</Text>
							</Button>
						))}
						{choice && order.length !== 1 && (
							<Button
								alignSelf="center"
								mt="xl"
								bg="blue300"
								w={200}
								rounded="lg"
								onPress={handleContinue}>
								<Text fontSize="sm">Continue</Text>
							</Button>
						)}
					</Div>
				</Div>
			</Animated.View>
			<Overlay visible={choice !== null && order.length === 1} rounded="xl">
				<Text fontSize="xl" mb="md">
					Quiz Complete!
				</Text>
				<Text>Your Score:</Text>
				<Text fontWeight="bold">
					{getScore()}/{Object.keys(game.qna).length}
				</Text>
				<Text color="blue500" mt="2xl" onPress={handleExit}>
					Exit
				</Text>
			</Overlay>
		</SafeAreaView>
	)
}

export default Game
