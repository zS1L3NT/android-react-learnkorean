import React, { useEffect } from "react"
import { Linking, SafeAreaView } from "react-native"
import { setTitle } from "../actions/TitleActions"
import { Button, Text } from "react-native-magnus"
import { useDispatch } from "react-redux"
import { useIsFocused } from "@react-navigation/native"

const Credits = (): JSX.Element => {
	//#region Hooks
	const dispatch = useDispatch()
	const isFocused = useIsFocused()
	//#endregion

	//#region Effects
	useEffect(() => {
		if (isFocused) {
			dispatch(setTitle("Credits"))
		}
	}, [isFocused])
	//#endregion

	//#region Functions
	const handleOpen = () => {
		Linking.openURL("market://details?id=com.jensonm.understandkorean")
	}
	//#endregion

	return (
		<SafeAreaView>
			<Text m="lg">
				This App&apos;s content comes from another app called Understand Korean by Jenson M.
				I built this app to improve on the UI of the app. All credits for the lesson content
				goes to Jenson M.
				{"\n\n"}I went through each and every lesson and extracted the lesson content,
				explaining how I have all the lesson content in this app. I have no intentions of
				monetising this app, hence no ads are show in this app.
			</Text>
			<Button
				alignSelf="center"
				bg="blue300"
				mt="lg"
				w={200}
				rounded="lg"
				onPress={handleOpen}>
				Open App
			</Button>
		</SafeAreaView>
	)
}

export default Credits
