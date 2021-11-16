import React, { useContext, useEffect, useRef, useState } from "react"
import { Animated, SafeAreaView, StyleSheet, Text } from "react-native"
import { Button, Div, Icon } from "react-native-magnus"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { SetTitleContext } from "../../App"
import { useIsFocused } from "@react-navigation/native"

type Props = NativeStackScreenProps<iLessonsStackParamList, "Lesson">

const Lesson = (props: Props): JSX.Element => {
	const { lesson } = props.route.params

	const setTitle = useContext(SetTitleContext)
	const isFocused = useIsFocused()
	const [page, setPage] = useState(0)
	const opacity = useRef(new Animated.Value(1)).current

	useEffect(() => {
		if (isFocused) {
			setTitle(lesson.title)
		}
	}, [isFocused])

	const handlePrevious = () => {
		Animated.timing(opacity, {
			toValue: 0,
			duration: 100,
			useNativeDriver: true
		}).start(() => {
			setPage(page - 1)
			Animated.timing(opacity, {
				toValue: 1,
				duration: 250,
				useNativeDriver: true
			}).start()
		})
	}

	const handleNext = () => {
		Animated.timing(opacity, {
			toValue: 0,
			duration: 100,
			useNativeDriver: true
		}).start(() => {
			setPage(page + 1)
			Animated.timing(opacity, {
				toValue: 1,
				duration: 250,
				useNativeDriver: true
			}).start()
		})
	}

	const handleContinue = () => {
		props.navigation.push("LessonQuiz", { lesson })
	}

	return (
		<SafeAreaView>
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
					style={styles.continueButton}
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
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	text: {
		fontSize: 18,
		margin: 16
	},
	continueButton: {
		paddingStart: 12,
		paddingEnd: 12
	},
	buttons: {
		margin: 12,
		padding: 12,
		justifyContent: "space-between"
	}
})

export default Lesson
