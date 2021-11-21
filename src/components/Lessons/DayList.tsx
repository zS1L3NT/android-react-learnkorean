import React, { useCallback, useContext, useEffect } from "react"
import { Button, Div, Icon, Text } from "react-native-magnus"
import { Lessons as lessons } from "../../data.json"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native"
import { SetTitleContext } from "../../App"
import { useIsFocused } from "@react-navigation/native"
import { useSelector } from "react-redux"

type Props = NativeStackScreenProps<iLessonsStackParamList, "DayList">

const DayList = (props: Props): JSX.Element => {
	const { month } = props.route.params

	//#region Hooks
	const setTitle = useContext(SetTitleContext)
	const isFocused = useIsFocused()
	const progress = useSelector(state => state.lessons[month - 1])
	//#endregion

	//#region Effects
	useEffect(() => {
		if (isFocused) {
			setTitle(`Lessons - Month ${month}`)
		}
	}, [isFocused, month])
	//#endregion

	//#region Functions
	const getBackgroundColor = useCallback(
		(day: number) => {
			if (progress[day - 1].completed) {
				return "#c6f6d5"
			}
			if (
				progress[day - 1].highest !== null ||
				Object.keys(progress[day - 1].qna).length > 0
			) {
				return "#fefcbf"
			}
			return "#fed7d7"
		},
		[progress]
	)

	const handlePrevious = () => {
		props.navigation.navigate("DayList", { month: month - 1 })
	}

	const handleNext = () => {
		props.navigation.navigate("DayList", { month: month + 1 })
	}

	const handleLesson = (lesson: iLesson, i: number) => {
		props.navigation.push("Lesson", { lesson, month, day: i + 1 })
	}
	//#endregion

	return (
		<SafeAreaView>
			<ScrollView style={styles.scroll}>
				<Div
					justifyContent="space-between"
					mb="lg"
					mx="lg"
					p="lg"
					bg="white"
					rounded="sm"
					shadow="sm"
					row>
					<Button
						disabled={month === 1}
						bg="white"
						h={40}
						w={40}
						onPress={handlePrevious}>
						<Icon name="left" fontSize={16} />
					</Button>
					<Text textAlign="center">Month {month}</Text>
					<Button disabled={month === 5} bg="white" h={40} w={40} onPress={handleNext}>
						<Icon name="right" fontSize={16} />
					</Button>
				</Div>
				{(lessons as iLesson[][])[month - 1].map((lesson, i) => (
					<View key={i}>
						<TouchableOpacity
							style={[
								styles.touchable,
								{ backgroundColor: getBackgroundColor(i + 1) },
								{ marginBottom: i === 29 ? 10 : 0 }
							]}
							onPress={() => handleLesson(lesson, i)}>
							<Text>
								Day {i + 1} - {lesson.title}
							</Text>
						</TouchableOpacity>
					</View>
				))}
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	scroll: {
		marginTop: 10
	},
	touchable: {
		padding: 20,
		marginTop: 8,
		marginStart: 10,
		marginEnd: 10,
		borderRadius: 10
	}
})

export default DayList
