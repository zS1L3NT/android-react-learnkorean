/**
 * Lessons
 */
export type iLessonsData = string[]

export interface iSetLessons {
	type: "SET_LESSONS"
	payload: {
		lessons: []
	}
}

export type iLessonsActions = iSetLessons
