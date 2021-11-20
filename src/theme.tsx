import { ThemeType } from "react-native-magnus"

const theme: ThemeType = {
	fontSize: {
		sm: 16,
		md: 18,
		lg: 20,
		xl: 24,
		"2xl": 32,
		"3xl": 40,
		"4xl": 48
	},
	components: {
		Button: {
			rounded: "circle",
			shadow: "sm",
			fontSize: "sm"
		}
	}
}

export default theme
