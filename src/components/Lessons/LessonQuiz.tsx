import Animated from "react-native-reanimated"
import equal from "deep-equal"
import React, { useCallback, useContext, useEffect, useState } from "react"
import { Button, Div, Text } from "react-native-magnus"
import {
	clearLessonQuizAnswers,
	setLessonCompleted,
	setLessonQuizAnswers
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
	const getOptionColor = useCallback(
		(option: string) => {
			const answer = lesson.qna[order[0]]
			if (choice !== null) {
				if (option === answer) {
					return "green500"
				} else {
					return "red500"
				}
			} else {
				return "grey"
			}
		},
		[choice, order]
	)

	const getOptionBackground = useCallback(
		(option: string) => {
			const answer = lesson.qna[order[0]]
			if (choice !== null && choice === option) {
				if (option === answer) {
					return "green200"
				} else {
					return "red200"
				}
			} else {
				return "white"
			}
		},
		[choice, order]
	)

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
		if (order.length !== 1) {
			LayoutAnimation.configureNext(
				LayoutAnimation.create(
					250,
					LayoutAnimation.Types.easeInEaseOut,
					LayoutAnimation.Properties.opacity
				)
			)

			setChoice(null)
			setOrder(order => order.slice(1, order.length))
		} else {
			props.navigation.navigate("DayList", { month })
		}
	}
	//#endregion

	return (
		<SafeAreaView>
			<Animated.View>
				<Div justifyContent="center" h="100%">
					<Text fontSize="xl" textAlign="center" m="md" mb="xl">
						{order[0]}
					</Text>
					<Div alignSelf="center">
						{options?.map(option => (
							<Button
								key={option}
								w={200}
								mt="lg"
								bg={getOptionBackground(option)}
								textAlign="center"
								alignSelf="center"
								rounded="lg"
								borderWidth={2}
								borderColor={getOptionColor(option)}
								disabled={choice !== null}
								onPress={() => handleOption(option)}>
								<Text color={getOptionColor(option)}>{option}</Text>
							</Button>
						))}
						{choice && (
							<Button
								mt="xl"
								bg="blue300"
								w={200}
								rounded="lg"
								onPress={handleContinue}>
								<Text fontSize="sm">
									{order.length !== 1 ? "Continue" : "Exit"}
								</Text>
							</Button>
						)}
					</Div>
				</Div>
			</Animated.View>
		</SafeAreaView>
	)
}

export default LessonQuiz
