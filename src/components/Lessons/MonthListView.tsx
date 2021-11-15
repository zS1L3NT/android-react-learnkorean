import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React from "react"
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Lessons as lessons } from "../../data.json"

type Props = NativeStackScreenProps<LessonsStackParamList, "Months">

const LessonsMonthListView = (props: Props): JSX.Element => {
	const handleMonth = (month: number) => {
		props.navigation.push("Days", { month })
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

export default LessonsMonthListView
