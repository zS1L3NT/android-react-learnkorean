import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import LessonsDayListView from "../components/DayListView"
import LessonsMonthListView from "../components/MonthListView"

const Stack = createNativeStackNavigator<iLessonsStackParamList>()

const LessonList = (): JSX.Element => {
	return (
		<Stack.Navigator initialRouteName="Months" screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Months" component={LessonsMonthListView} />
			<Stack.Screen name="Days" component={LessonsDayListView} initialParams={{ month: 0 }} />
		</Stack.Navigator>
	)
}

export default LessonList
