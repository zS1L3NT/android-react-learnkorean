import Animated from "react-native-reanimated"
import equal from "deep-equal"
import React, { useCallback, useContext, useEffect, useState } from "react"
import { Button, Div, Overlay, Text } from "react-native-magnus"
import {
	clearLessonQuizAnswers,
	setLessonCompleted,
	setLessonQuizAnswers,
	setLessonQuizHighest
} from "../../actions/LessonsActions"
import { LayoutAnimation, Platform, SafeAreaView, UIManager } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { SetTitleContext } from "../../App"
import { useDispatch, useSelector } from "react-redux"
import { useIsFocused } from "@react-navigation/native"

type Props = NativeStackScreenProps<iLessonsStackParamList, "Lesson">

const LessonQuiz = (props: Props): JSX.Element => {
	const { lesson, month, day } = props.route.params

	//#region Hooks
	const setTitle = useContext(SetTitleContext)
	const dispatch = useDispatch()
	const isFocused = useIsFocused()
	const progress = useSelector(state => state.lessons[month - 1][day - 1].qna)
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
			setTitle("Lesson Quiz")
		}
	}, [isFocused])

	useEffect(() => {
		if (!qna && progress) {
			// If qna is unset and previous progress exists
			// Should only run once
			const unanswered = Object.keys(lesson.qna).filter(q => !(q in progress))
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
			if (Object.keys(qna).length === Object.keys(lesson.qna).length) {
				// If all questions answered, regardless if correct or wrong
				dispatch(clearLessonQuizAnswers(day, month))
				console.log(`Cleared lesson progress (${day}, ${month})`)

				if (equal(qna, lesson.qna)) {
					// If all questions are correct
					dispatch(setLessonCompleted(day, month))
					console.log(`Set lesson complete (${day}, ${month})`)
				}
			} else {
				// Not all questions answered yet, save progress
				dispatch(setLessonQuizAnswers(day, month, qna))
				console.log(`Saving lesson progress (${day}, ${month})`, qna)
			}
		}
	}, [qna])

	useEffect(() => {
		if (order.length === 0) return

		const optionsShown = [lesson.qna[order[0]]]
		const optionsLeft = lesson.options.slice()

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
			const answer = lesson.qna[order[0]]
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
			if (qna[question] === lesson.qna[question]) {
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
		dispatch(setLessonQuizHighest(day, month, getScore()))
		props.navigation.navigate("DayList", { month })
	}
	//#endregion

	return (
		<SafeAreaView>
			<Animated.View>
				<Div justifyContent="center" h="90%">
					<Div alignSelf="center" bg="white" w="90%" mb="xl" shadow="sm" rounded="xl">
						<Text
							fontSize="md"
							fontWeight="300"
							textAlign="center"
							m="md"
							mb="xl"
							opacity={0.4}>
							Q{Object.keys(lesson.qna).length - order.length + 1}/
							{Object.keys(lesson.qna).length}
						</Text>
						<Text fontSize="lg" textAlign="center" m="md" mb="lg">
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
				<Text fontSize="xl" textAlign="center" mb="md">
					Quiz Complete!
				</Text>
				<Text textAlign="center">Your Score:</Text>
				<Text textAlign="center" fontWeight="bold">
					{getScore()}/{Object.keys(lesson.qna).length}
				</Text>
				<Text textAlign="center" color="blue500" mt="2xl" onPress={handleExit}>
					Exit
				</Text>
			</Overlay>
		</SafeAreaView>
	)
}

export default LessonQuiz
