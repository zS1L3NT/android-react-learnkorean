import React, { useContext, useEffect } from "react"
import { Lessons as lessons } from "../../data.json"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SetTitleContext } from "../../App"
import { useIsFocused } from "@react-navigation/native"

type Props = NativeStackScreenProps<iLessonsStackParamList, "MonthList">

const MonthList = (props: Props): JSX.Element => {
	const setTitle = useContext(SetTitleContext)
	const isFocused = useIsFocused()

	useEffect(() => {
		if (isFocused) {
			setTitle("Lessons")
		}
	}, [isFocused])

	const handleMonth = (month: number) => {
		props.navigation.push("DayList", { month })
	}

	return (
		<SafeAreaView>
			<ScrollView>
				{lessons
					.map((_, i) => i + 1)
					.map(month => (
						<View key={month}>
							<TouchableOpacity
								style={styles.touchable}
								onPress={() => handleMonth(month)}>
								<Text style={styles.text}>Month {month}</Text>
							</TouchableOpacity>
						</View>
					))}
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	touchable: {
		padding: 20,
		marginTop: 8,
		marginStart: 10,
		marginEnd: 10,
		borderRadius: 10,
		backgroundColor: "#fefefe"
	},
	text: {
		fontSize: 18
	}
})

export default MonthList
