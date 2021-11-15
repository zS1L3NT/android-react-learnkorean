type iRootDrawerParamList = {
	Lessons: undefined
	"Learning to Read": undefined
	"Memory Games": undefined
}

type iLessonsStackParamList = {
	Months: undefined
	Days: { month: number }
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