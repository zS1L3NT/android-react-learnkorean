import React from "react"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { SafeAreaView } from "react-native"

type Props = NativeStackScreenProps<iLessonsStackParamList, "Lesson">

const LessonQuiz = (props: Props): JSX.Element => {
	const { lesson } = props.route.params
	
	return <SafeAreaView></SafeAreaView>
}

export default LessonQuiz