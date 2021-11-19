type iRootDrawerParamList = {
	"Lessons": undefined
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
	title: string
	pages: string[]
	qna: { [question: string]: string }
	options: string[]
}

type iGame = {
	qna: { [question: string]: string }
	options: string[]
}
