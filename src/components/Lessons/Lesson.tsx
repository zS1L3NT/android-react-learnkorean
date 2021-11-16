import React, { useContext, useEffect } from "react"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { SafeAreaView, Text } from "react-native"
import { SetTitleContext } from "../../App"
import { useIsFocused } from "@react-navigation/native"

type Props = NativeStackScreenProps<iLessonsStackParamList, "Lesson">

const Lesson = (props: Props): JSX.Element => {
	const { lesson } = props.route.params

	const setTitle = useContext(SetTitleContext)
	const isFocused = useIsFocused()

	useEffect(() => {
		if (isFocused) {
			setTitle(lesson.title)
		}
	}, [isFocused])

	return (
		<SafeAreaView>
			<Text>{lesson.pages[0]}</Text>
		</SafeAreaView>
	)
}

export default Lesson
