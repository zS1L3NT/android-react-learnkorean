import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React from "react"
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Button, Div, Icon } from "react-native-magnus"
import { Lessons as lessons } from "../data.json"

type Props = NativeStackScreenProps<iLessonsStackParamList, "Days">

const LessonsDayListView = (props: Props): JSX.Element => {
	const { month } = props.route.params

	const handlePrevious = () => {
		props.navigation.navigate("Days", { month: month - 1 })
	}

	const handleNext = () => {
		props.navigation.navigate("Days", { month: month + 1 })
	}

	const handleLesson = (lesson: iLesson) => {}

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
				{lessons[month - 1]
					.map((lesson, i) => (
						<View key={i}>
							<TouchableOpacity
								style={styles.touchable}
								onPress={() => handleLesson(lesson)}>
								<Text style={styles.touchableText}>Day {i + 1} - {lesson.title}</Text>
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

export default LessonsDayListView
