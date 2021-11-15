import React from "react"
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Hanguls as hanguls } from "../data.json"

const HangulList = (): JSX.Element => {
	const handleHangul = (hangul: number) => {}

	return (
		<SafeAreaView>
			<ScrollView>
				{hanguls
					.map((_, i) => i + 1)
					.map(hangul => (
						<View key={hangul}>
							<TouchableOpacity
								style={styles.touchable}
								onPress={() => handleHangul(hangul)}>
								<Text style={styles.text}>Page {hangul}</Text>
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
