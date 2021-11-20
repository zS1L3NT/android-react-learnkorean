import React, { useContext, useEffect, useRef, useState } from "react"
import {
	Animated,
	LayoutAnimation,
	Platform,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	UIManager
} from "react-native"
import { Button, Div, Icon, Overlay } from "react-native-magnus"
import { clearLessonQuizAnswers } from "../../actions/LessonsActions"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { SetTitleContext } from "../../App"
import { useDispatch, useSelector } from "react-redux"
import { useIsFocused } from "@react-navigation/native"

type Props = NativeStackScreenProps<iLessonsStackParamList, "Lesson">

const Lesson = (props: Props): JSX.Element => {
	const { lesson, month, day } = props.route.params

	//#region Hooks
	const setTitle = useContext(SetTitleContext)
	const dispatch = useDispatch()
	const isFocused = useIsFocused()
	const progress = useSelector(state => state.lessons[month - 1][day - 1].qna)
	const [page, setPage] = useState(0)
	const [overlayVisible, setOverlayVisible] = useState(false)
	const opacity = useRef(new Animated.Value(1)).current
	//#endregion

	//#region Effects
	useEffect(() => {
		if (Platform.OS === "android") {
			UIManager.setLayoutAnimationEnabledExperimental(true)
		}
	}, [])

	useEffect(() => {
		if (isFocused) {
			setTitle(lesson.title)
		}
	}, [isFocused])
	//#endregion

	//#region Functions
	const handlePrevious = () => {
		Animated.timing(opacity, {
			toValue: 0,
			duration: 250,
			useNativeDriver: true
		}).start(() => {
			LayoutAnimation.configureNext(
				LayoutAnimation.create(
					250,
					LayoutAnimation.Types.easeInEaseOut,
					LayoutAnimation.Properties.scaleY
				)
			)
			setPage(page - 1)
			Animated.timing(opacity, {
				toValue: 1,
				duration: 500,
				useNativeDriver: true
			}).start()
		})
	}

	const handleNext = () => {
		Animated.timing(opacity, {
			toValue: 0,
			duration: 250,
			useNativeDriver: true
		}).start(() => {
			LayoutAnimation.configureNext(
				LayoutAnimation.create(
					250,
					LayoutAnimation.Types.easeInEaseOut,
					LayoutAnimation.Properties.scaleY
				)
			)
			setPage(page + 1)
			Animated.timing(opacity, {
				toValue: 1,
				duration: 500,
				useNativeDriver: true
			}).start()
		})
	}

	const handleContinue = () => {
		if (Object.keys(progress).length === 0) {
			props.navigation.push("LessonQuiz", { lesson, month, day })
		} else {
			setOverlayVisible(true)
		}
	}

	const handleOverlayRestart = () => {
		setOverlayVisible(false)
		dispatch(clearLessonQuizAnswers(day, month))
		console.log(`Cleared lesson progress (${day}, ${month})`)

		props.navigation.push("LessonQuiz", { lesson, month, day })
	}

	const handleOverlayContinue = () => {
		setOverlayVisible(false)

		props.navigation.push("LessonQuiz", { lesson, month, day })
	}
	//#endregion

	return (
		<SafeAreaView>
			<ScrollView>
				<Animated.View style={{ opacity }}>
					<Text style={styles.text}>{lesson.pages[page]}</Text>
				</Animated.View>
				<Div row style={styles.buttons}>
					<Button
						disabled={page === 0}
						bg="white"
						h={40}
						w={40}
						rounded="circle"
						shadow="sm"
						onPress={handlePrevious}>
						<Icon name="left" fontSize={16} />
					</Button>
					<Button
						disabled={page !== lesson.pages.length - 1}
						bg="green400"
						rounded="circle"
						shadow="sm"
						style={styles.textButton}
						onPress={handleContinue}>
						<Text>Continue</Text>
					</Button>
					<Button
						disabled={page === lesson.pages.length - 1}
						bg="white"
						h={40}
						w={40}
						rounded="circle"
						shadow="sm"
						onPress={handleNext}>
						<Icon name="right" fontSize={16} />
					</Button>
				</Div>
				<Overlay visible={overlayVisible}>
					<Text style={styles.overlayTitle}>Quiz Incomplete!</Text>
					<Text style={styles.overlayMessage}>
						{"Do you want to "}
						<Text style={styles.bold}>restart your progress</Text>
						{" or "}
						<Text style={styles.bold}>continue the quiz</Text>
						{"?"}
					</Text>
					<Div mt="xl" justifyContent="space-evenly" row>
						<Button
							bg="red400"
							rounded="circle"
							shadow="sm"
							style={styles.textButton}
							onPress={handleOverlayRestart}>
							Restart
						</Button>
						<Button
							bg="green400"
							rounded="circle"
							shadow="sm"
							style={styles.textButton}
							onPress={handleOverlayContinue}>
							Continue
						</Button>
					</Div>
				</Overlay>
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	text: {
		fontSize: 18,
		margin: 16
	},
	textButton: {
		paddingStart: 12,
		paddingEnd: 12
	},
	buttons: {
		margin: 12,
		padding: 12,
		justifyContent: "space-between"
	},
	overlayTitle: {
		fontSize: 22,
		textAlign: "center",
		marginBottom: 12
	},
	overlayMessage: {
		fontSize: 18,
		textAlign: "center"
	},
	bold: {
		fontWeight: "bold"
	}
})

export default Lesson
