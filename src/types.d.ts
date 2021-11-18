type iRootDrawerParamList = {
	Lessons: undefined
	"Learning to Read": undefined
	"Memory Games": undefined
}

type iLessonsStackParamList = {
	MonthList: undefined
	DayList: { month: number }
	Lesson: { lesson: iLesson; month: number }
	LessonQuiz: { lesson: iLesson; month: number }
}

type iHangulsStackParamList = {
	HangulList: undefined
	Hangul: { hangul: string }
}

type iGamesStackParamList = {
	GameList: undefined
	Game: { game: iGame }
}

type iLesson = {
	questions: string[]
	answers: string[]
	choices: string[]
	pages: string[]
	title: string
}

type iGame = {
	questions: string[]
	answers: string[]
	choices: string[]
}
