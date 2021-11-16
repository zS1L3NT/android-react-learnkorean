import DayList from "../components/Lessons/DayList"
import Lesson from "../components/Lessons/Lesson"
import LessonQuiz from "../components/Lessons/LessonQuiz"
import MonthList from "../components/Lessons/MonthList"
import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

const Stack = createNativeStackNavigator<iLessonsStackParamList>()

const Lessons = (): JSX.Element => {
	return (
		<Stack.Navigator initialRouteName="MonthList" screenOptions={{ headerShown: false }}>
			<Stack.Screen name="MonthList" component={MonthList} />
			<Stack.Screen name="DayList" component={DayList} initialParams={{ month: 0 }} />
			<Stack.Screen name="Lesson" component={Lesson} />
			<Stack.Screen name="LessonQuiz" component={LessonQuiz} />
		</Stack.Navigator>
	)
}

export default Lessons
