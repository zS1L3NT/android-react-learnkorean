import React, { useContext, useEffect } from "react"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Games as games } from "../../data.json"
import { useIsFocused } from "@react-navigation/native"
import { SetTitleContext } from "../../App"

type Props = NativeStackScreenProps<iGamesStackParamList, "GameList">

const GameList = (props: Props): JSX.Element => {
	const isFocused = useIsFocused()
	const setTitle = useContext(SetTitleContext)

	useEffect(() => {
		if (isFocused) {
			setTitle("Memory Games")
		}
	}, [isFocused])

	const handleTitle = (title: keyof typeof games) => {
		props.navigation.push("Game", { game: games[title] })
		setTitle(title)
	}

	return (
		<SafeAreaView>
			<ScrollView>
				{(Object.keys(games) as (keyof typeof games)[]).map(title => (
					<View key={title}>
						<TouchableOpacity
							style={styles.touchable}
							onPress={() => handleTitle(title)}>
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
