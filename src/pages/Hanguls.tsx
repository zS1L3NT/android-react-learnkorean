import React, { useEffect, useRef } from "react"
import {
	Animated,
	LayoutAnimation,
	Platform,
	SafeAreaView,
	ScrollView,
	UIManager
} from "react-native"
import { Button, Div, Text } from "react-native-magnus"
import { Hanguls as hanguls } from "../data.json"
import { setHanguls } from "../actions/HangulsActions"
import { setTitle } from "../actions/TitleActions"
import { useDispatch, useSelector } from "react-redux"
import { useIsFocused } from "@react-navigation/native"

const Hanguls = (): JSX.Element => {
	//#region Hooks
	const dispatch = useDispatch()
	const isFocused = useIsFocused()
	const progress = useSelector(state => state.hanguls)
	const opacity = useRef(new Animated.Value(1)).current
	//#endregion

	//#region Effects
	useEffect(() => {
		if (Platform.OS === "android") {
			UIManager.setLayoutAnimationEnabledExperimental(true)
		}
	}, [])

	useEffect(() => {
		if (isFocused) {
			dispatch(setTitle("Learning to Read"))
		}
	}, [isFocused])
	//#endregion

	//#region Functions
	const handleBack = () => {
		Animated.timing(opacity, {
			toValue: 0,
			duration: 250,
			useNativeDriver: true
		}).start(() => {
			LayoutAnimation.configureNext(
				LayoutAnimation.create(
					250,
					LayoutAnimation.Types.easeInEaseOut,
					LayoutAnimation.Properties.scaleY
				)
			)
			dispatch(setHanguls(progress - 1))
			Animated.timing(opacity, {
				toValue: 1,
				duration: 500,
				useNativeDriver: true
			}).start()
		})
	}

	const handleNext = () => {
		Animated.timing(opacity, {
			toValue: 0,
			duration: 250,
			useNativeDriver: true
		}).start(() => {
			LayoutAnimation.configureNext(
				LayoutAnimation.create(
					250,
					LayoutAnimation.Types.easeInEaseOut,
					LayoutAnimation.Properties.scaleY
				)
			)
			dispatch(setHanguls(progress + 1))
			Animated.timing(opacity, {
				toValue: 1,
				duration: 500,
				useNativeDriver: true
			}).start()
		})
	}
	//#endregion

	return (
		<SafeAreaView>
			<ScrollView>
				<Div
					justifyContent="space-between"
					m="lg"
					p="lg"
					bg="white"
					rounded="sm"
					shadow="sm"
					row>
					<Text fontWeight="bold" textAlign="center" w="100%">
						{progress} / {hanguls.length}
					</Text>
				</Div>
				<Animated.View style={{ opacity }}>
					<Text m="lg">{hanguls[progress]}</Text>
				</Animated.View>
				<Div justifyContent="space-between" m="md" p="md" row>
					<Button disabled={progress === 1} bg="green400" px="xl" onPress={handleBack}>
						Back
					</Button>
					<Button
						disabled={progress === hanguls.length}
						bg="green400"
						px="xl"
						onPress={handleNext}>
						Next
					</Button>
				</Div>
			</ScrollView>
		</SafeAreaView>
	)
}

export default Hanguls
