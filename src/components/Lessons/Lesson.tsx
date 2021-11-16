import React, { useContext, useEffect } from "react"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { SafeAreaView } from "react-native"
import { SetTitleContext } from "../../App"
import { useIsFocused } from "@react-navigation/native"

type Props = NativeStackScreenProps<iLessonsStackParamList, "Lesson">

const Lesson = (props: Props): JSX.Element => {
	const isFocused = useIsFocused()
	const setTitle = useContext(SetTitleContext)
	const { lesson } = props.route.params

	useEffect(() => {
		if (isFocused) {
			setTitle(lesson.title)
		}
	}, [isFocused])

	return <SafeAreaView></SafeAreaView>
}

export default Lesson
