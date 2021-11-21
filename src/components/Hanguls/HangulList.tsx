import React, { useEffect } from "react"
import { Hanguls as hanguls } from "../../data.json"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native"
import { setTitle } from "../../actions/TitleActions"
import { Text } from "react-native-magnus"
import { useDispatch } from "react-redux"
import { useIsFocused } from "@react-navigation/native"

type Props = NativeStackScreenProps<iHangulsStackParamList, "HangulList">

const HangulList = (props: Props): JSX.Element => {
	const dispatch = useDispatch()
	const isFocused = useIsFocused()

	useEffect(() => {
		if (isFocused) {
			dispatch(setTitle("Learning to Read"))
		}
	}, [isFocused])

	const handlePage = (page: number) => {
		props.navigation.push("Hangul", { hangul: hanguls[page] })
		dispatch(setTitle(`Learning to Read - Page ${page}`))
	}

	return (
		<SafeAreaView>
			<ScrollView>
				{hanguls
					.map((_, i) => i + 1)
					.map(page => (
						<View key={page}>
							<TouchableOpacity
								style={styles.touchable}
								onPress={() => handlePage(page)}>
								<Text>Page {page}</Text>
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
	}
})

export default HangulList
