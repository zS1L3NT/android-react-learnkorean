import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import LessonsDayListView from "../components/Lessons/DayListView"
import LessonsMonthListView from "../components/Lessons/MonthListView"

const Stack = createNativeStackNavigator<LessonsStackParamList>()

const LessonList = (): JSX.Element => {
	return (
		<Stack.Navigator initialRouteName="Months" screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Months" component={LessonsMonthListView} />
			<Stack.Screen name="Days" component={LessonsDayListView} initialParams={{ month: 0 }} />
		</Stack.Navigator>
	)
}

export default LessonList
