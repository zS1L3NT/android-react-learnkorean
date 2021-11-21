import { iSetHanguls } from "../redux"

export const setHanguls = (hanguls: number): iSetHanguls => ({
	type: "SET_HANGULS",
	payload: {
		hanguls
	}
})
