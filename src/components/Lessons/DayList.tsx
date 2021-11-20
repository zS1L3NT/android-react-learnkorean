import React, { useContext, useEffect } from "react"
import { Button, Div, Icon } from "react-native-magnus"
import { Lessons as lessons } from "../../data.json"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SetTitleContext } from "../../App"
import { useIsFocused } from "@react-navigation/native"

type Props = NativeStackScreenProps<iLessonsStackParamList, "DayList">

const DayList = (props: Props): JSX.Element => {
	const { month } = props.route.params

	const setTitle = useContext(SetTitleContext)
	const isFocused = useIsFocused()

	useEffect(() => {
		if (isFocused) {
			setTitle(`Lessons - Month ${month}`)
		}
	}, [isFocused, month])

	const handlePrevious = () => {
		props.navigation.navigate("DayList", { month: month - 1 })
	}

	const handleNext = () => {
		props.navigation.navigate("DayList", { month: month + 1 })
	}

	const handleLesson = (lesson: iLesson, i: number) => {
		props.navigation.push("Lesson", { lesson, month, day: i + 1 })
	}

	return (
		<SafeAreaView>
			<Div bg="white" rounded="sm" shadow="sm" style={styles.month} row>
				<Button
					disabled={month === 1}
					bg="white"
					h={40}
					w={40}
					rounded="circle"
					onPress={handlePrevious}>
					<Icon name="left" fontSize={16} />
				</Button>
				<Text style={styles.monthText}>Month {month}</Text>
				<Button
					disabled={month === 5}
					bg="white"
					h={40}
					w={40}
					rounded="circle"
					onPress={handleNext}>
					<Icon name="right" fontSize={16} />
				</Button>
			</Div>
			<ScrollView style={styles.scroll}>
				{(lessons as iLesson[][])[month - 1].map((lesson, i) => (
					<View key={i}>
						<TouchableOpacity
							style={styles.touchable}
							onPress={() => handleLesson(lesson, i)}>
							<Text style={styles.touchableText}>
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
	month: {
		padding: 12,
		marginTop: 8,
		marginStart: 10,
		marginEnd: 10,
		justifyContent: "space-between"
	},
	monthText: {
		alignSelf: "center",
		textAlign: "center",
		fontSize: 18
	},
	scroll: {
		marginTop: 10
	},
	touchable: {
		padding: 20,
		marginTop: 8,
		marginStart: 10,
		marginEnd: 10,
		borderRadius: 10,
		backgroundColor: "#fefefe"
	},
	touchableText: {
		fontSize: 18
	}
})

export default DayList
