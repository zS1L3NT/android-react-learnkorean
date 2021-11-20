import Animated from "react-native-reanimated"
import React, { useCallback, useContext, useEffect, useState } from "react"
import { Button, Div } from "react-native-magnus"
import { LayoutAnimation, Platform, SafeAreaView, StyleSheet, Text, UIManager } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { SetTitleContext } from "../../App"
import { useIsFocused } from "@react-navigation/native"
import { useDispatch, useSelector } from "react-redux"
import { setLessonQuizAnswers } from "../../actions/LessonsActions"
import equal from "deep-equal"

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
		console.log("create", day, month, qna, progress)
		if (!qna && progress) {
			const unanswered = Object.keys(lesson.qna).filter(q => !(q in progress))
			console.log("unanswered", unanswered)
			setOrder(unanswered.sort(() => Math.random() - 0.5))
			setQNA(progress) // answered set here so wrap scope in "if"
		}
		return () => {
			console.log("destroy", qna, progress)
			if (qna && !equal(qna, progress)) {
				console.log("destroying", qna, progress)
				dispatch(setLessonQuizAnswers(day, month, qna))
			}
		}
	}, [qna, progress])

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
		[choice]
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
		[choice]
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
				<Div h="100%" justifyContent="center">
					<Text style={styles.question}>
						{Object.keys(qna || {}).length + 1}/
						{Object.keys(lesson.qna || {}).length}: {order[0]}
					</Text>
					<Div alignSelf="center">
						{options?.map(option => (
							<Button
								key={option}
								w={200}
								mt="lg"
								px="xl"
								py="lg"
								bg={getOptionBackground(option)}
								textAlign="center"
								alignSelf="center"
								rounded="lg"
								shadow="sm"
								fontSize={18}
								borderWidth={2}
								borderColor={getOptionColor(option)}
								color={getOptionColor(option)}
								disabled={choice !== null}
								onPress={() => handleOption(option)}>
								{option}
							</Button>
						))}
						{choice && (
							<Button mt="xl" w={200} rounded="lg" onPress={handleContinue}>
								{order.length !== 1 ? "Continue" : "Exit"}
							</Button>
						)}
					</Div>
				</Div>
			</Animated.View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	question: {
		fontSize: 22,
		textAlign: "center",
		margin: 10,
		marginBottom: 30
	}
})

export default LessonQuiz
