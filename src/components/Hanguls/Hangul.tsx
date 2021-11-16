import React from "react"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { SafeAreaView } from "react-native"

type Props = NativeStackScreenProps<iHangulsStackParamList, "Hangul">

const Hangul = (props: Props): JSX.Element => {
	const { hangul } = props.route.params

	return <SafeAreaView></SafeAreaView>
}

export default Hangul
