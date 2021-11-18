import Animated from "react-native-reanimated"
import React, { useCallback, useContext, useEffect, useState } from "react"
import { Button, Div } from "react-native-magnus"
import { LayoutAnimation, SafeAreaView, StyleSheet, Text } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { SetTitleContext } from "../../App"
import { useIsFocused } from "@react-navigation/native"

type Props = NativeStackScreenProps<iLessonsStackParamList, "Lesson">

const LessonQuiz = (props: Props): JSX.Element => {
	const { lesson, month } = props.route.params

	const setTitle = useContext(SetTitleContext)
	const isFocused = useIsFocused()
	const [score, setScore] = useState(0)
	const [index, setIndex] = useState(0)
	const [choice, setChoice] = useState<string | null>(null)
	const [options, setOptions] = useState<string[]>()
	const [order] = useState(
		Array(lesson.questions.length)
			.fill(0)
			.map((_, i) => i)
			.sort(() => Math.random() - 0.5)
	)

	useEffect(() => {
		if (isFocused) {
			setTitle("Lesson Quiz")
		}
	}, [isFocused])

	useEffect(() => {
		const options = [lesson.choices[order[index]]]
		let answers = lesson.choices

		for (let i = 0; i < 3; i++) {
			answers = answers.filter(a => !options.includes(a))
			options.push(answers[Math.floor(Math.random() * answers.length)])
		}

		options.sort(() => Math.random() - 0.5)
		setOptions(options)
	}, [index])

	const getOptionColor = useCallback(
		(option: string) => {
			const answer = lesson.answers[order[index]]
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
			const answer = lesson.answers[order[index]]
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

		const answer = lesson.answers[order[index]]
		setChoice(option)

		if (option === answer) {
			setScore(score + 1)
		}
	}

	const handleContinue = () => {
		if (index < lesson.questions.length - 1) {
			LayoutAnimation.configureNext(
				LayoutAnimation.create(
					250,
					LayoutAnimation.Types.easeInEaseOut,
					LayoutAnimation.Properties.opacity
				)
			)

			setChoice(null)
			setIndex(index + 1)
		} else {
			props.navigation.navigate("DayList", { month })
		}
	}

	return (
		<SafeAreaView>
			<Animated.View>
				<Div h="100%" justifyContent="center">
					<Text style={styles.question}>{lesson.questions[order[index]]}</Text>
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
								{index < lesson.questions.length - 1 ? "Continue" : "Exit"}
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
