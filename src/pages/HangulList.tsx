import React from "react"
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Hanguls as hanguls } from "../data.json"

const HangulList = (): JSX.Element => {
	const handleHangul = (hangul: string) => {}

	return (
		<SafeAreaView>
			<ScrollView>
				{hanguls.map((hangul, i) => (
					<View key={i}>
						<TouchableOpacity
							style={styles.touchable}
							onPress={() => handleHangul(hangul)}>
							<Text style={styles.text}>Page {i + 1}</Text>
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

export default HangulList
