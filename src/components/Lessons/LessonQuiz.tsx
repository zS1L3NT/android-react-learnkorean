import Animated from "react-native-reanimated"
import React, { useCallback, useContext, useEffect, useState } from "react"
import { Button, Div } from "react-native-magnus"
import { LayoutAnimation, Platform, SafeAreaView, StyleSheet, Text, UIManager } from "react-native"
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
	const [order] = useState(Object.keys(lesson.qna).sort(() => Math.random() - 0.5))

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
		const optionsShown = [lesson.qna[order[index]]]
		const optionsLeft = lesson.options.slice()

		for (let i = 0; i < 3; i++) {
			optionsLeft.splice(optionsLeft.indexOf(optionsShown.slice(-1)[0]!), 1)
			optionsShown.push(optionsLeft[Math.floor(Math.random() * optionsLeft.length)])
		}

		optionsShown.sort(() => Math.random() - 0.5)
		setOptions(optionsShown)
	}, [index])

	const getOptionColor = useCallback(
		(option: string) => {
			const answer = lesson.qna[order[index]]
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
			const answer = lesson.qna[order[index]]
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

		const answer = lesson.qna[order[index]]
		setChoice(option)

		if (option === answer) {
			setScore(score + 1)
		}
	}

	const handleContinue = () => {
		if (index < Object.keys(lesson.qna).length - 1) {
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
					<Text style={styles.question}>{order[index]}</Text>
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
								{index < Object.keys(lesson.qna).length - 1 ? "Continue" : "Exit"}
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
