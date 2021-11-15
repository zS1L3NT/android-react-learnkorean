import React from "react"
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Games as games } from "../data.json"

const GameList = (): JSX.Element => {
	const handleGame = (title: string) => {}

	return (
		<SafeAreaView>
			<ScrollView>
				{Object.keys(games).map(title => (
					<View key={title}>
						<TouchableOpacity style={styles.touchable}>
							<Text style={styles.text}>{title}</Text>
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

export default GameList
