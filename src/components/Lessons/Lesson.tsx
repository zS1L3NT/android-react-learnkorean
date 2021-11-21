import React, { useEffect, useRef, useState } from "react"
import {
	Animated,
	LayoutAnimation,
	Platform,
	SafeAreaView,
	ScrollView,
	UIManager
} from "react-native"
import { Button, Div, Icon, Overlay, Text } from "react-native-magnus"
import { clearLessonQuizAnswers } from "../../actions/LessonsActions"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { setTitle } from "../../actions/TitleActions"
import { useDispatch, useSelector } from "react-redux"
import { useIsFocused } from "@react-navigation/native"

type Props = NativeStackScreenProps<iLessonsStackParamList, "Lesson">

const Lesson = (props: Props): JSX.Element => {
	const { lesson, month, day } = props.route.params

	//#region Hooks
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
			dispatch(setTitle(lesson.title))
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
					<Text m="lg">{lesson.pages[page]}</Text>
				</Animated.View>
				<Div justifyContent="space-between" m="md" p="md" row>
					<Button disabled={page === 0} bg="white" h={40} w={40} onPress={handlePrevious}>
						<Icon name="left" />
					</Button>
					<Button
						disabled={page !== lesson.pages.length - 1}
						bg="green400"
						px="xl"
						onPress={handleContinue}>
						Continue
					</Button>
					<Button
						disabled={page === lesson.pages.length - 1}
						bg="white"
						h={40}
						w={40}
						onPress={handleNext}>
						<Icon name="right" />
					</Button>
				</Div>
			</ScrollView>
			<Overlay visible={overlayVisible}>
				<Text textAlign="center" fontSize="lg" mb="md">
					Quiz Incomplete!
				</Text>
				<Text textAlign="center">
					{"Do you want to "}
					<Text fontWeight="bold">restart your progress</Text>
					{" or "}
					<Text fontWeight="bold">continue the quiz</Text>
					{"?"}
				</Text>
				<Div justifyContent="space-evenly" mt="xl" row>
					<Text color="red500" onPress={handleOverlayRestart}>
						Restart
					</Text>
					<Text color="green500" onPress={handleOverlayContinue}>
						Continue
					</Text>
				</Div>
			</Overlay>
		</SafeAreaView>
	)
}

export default Lesson
