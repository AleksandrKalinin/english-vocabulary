let initialState = {
	"exercises": {
		"engToRusWords": {
			"completed": 1,
			"wordsTrained": [
				{
					"id": 234,
					"date": "Sun Jul 24 2022 21:07:21 GMT+0300 (Москва, стандартное время)"
				},
				{
					"id": 34,
					"date": "Sun Jul 24 2022 20:07:21 GMT+0300 (Москва, стандартное время)"
				}
			]
		},
		"rusToEngWords": {
			"completed": 3,
			"wordsTrained": [
				{
					"id": 234,
					"date": "Sun Jul 24 2022 21:07:21 GMT+0300 (Москва, стандартное время)"
				},
				{
					"id": 34,
					"date": "Sun Jul 24 2022 20:07:21 GMT+0300 (Москва, стандартное время)"
				}
			]
		},
		"audioWords": {
			"completed": 4,
			"wordsTrained": [
				{
					"id": 234,
					"date": "Sun Jul 24 2022 21:07:21 GMT+0300 (Москва, стандартное время)"
				},
				{
					"id": 34,
					"date": "Sun Jul 24 2022 20:07:21 GMT+0300 (Москва, стандартное время)"
				}
			]
		},
		"constructWords": {
			"completed": 1,
			"wordsTrained": [
				{
					"id": 234,
					"date": "Sun Jul 24 2022 21:07:21 GMT+0300 (Москва, стандартное время)"
				},
				{
					"id": 34,
					"date": "Sun Jul 24 2022 20:07:21 GMT+0300 (Москва, стандартное время)"
				}
			]
		},
		"trueOrFalseWords": {
			"completed": 5,
			"wordsTrained": [
				{
					"id": 234,
					"date": "Sun Jul 24 2022 21:07:21 GMT+0300 (Москва, стандартное время)"
				},
				{
					"id": 34,
					"date": "Sun Jul 24 2022 20:07:21 GMT+0300 (Москва, стандартное время)"
				}
			]
		},
		"cardWords": {
			"completed": 1,
			"wordsTrained": [
				{
					"id": 234,
					"date": "Sun Jul 24 2022 21:07:21 GMT+0300 (Москва, стандартное время)"
				},
				{
					"id": 34,
					"date": "Sun Jul 24 2022 20:07:21 GMT+0300 (Москва, стандартное время)"
				}
			]
		}												
	},
	"engToRusWords": [
		{
			"date": "Sun Jul 24 2022 21:07:21 GMT+0300 (Москва, стандартное время)"
		},
		{
			"date": "Sun Jul 24 2022 20:07:21 GMT+0300 (Москва, стандартное время)"
		},
		{
			"date": "Sun Jul 23 2022 21:07:21 GMT+0300 (Москва, стандартное время)"
		},
		{
			"date": "Sun Jul 23 2022 21:07:21 GMT+0300 (Москва, стандартное время)"
		}					
	],
	"rusToEngWords": [],
	"audioWords": [],
	"constructWords": [],
	"trueOrFalseWords": [],
	"cardWords": [],

	"recreateTxt": 0,
	"recreateAudioTxt": 0,
	"placeSpaces": 0,
	"fillTheGaps": 0,
	"commonPhrases": 0,

	"testsComplete": 0,
	"testsScore": 0,
	"testsRate": 0,

	"wordsTotal": 0,
	"totalScore": 0,
	"exercisesComplete": 0,

	"todayScore": 0,
	"wordsStudied": 0,
	"wordsRemaining": 0

};



let exercisesReducer = (state = initialState, action) => {
	switch(action.type){
		case 'UPDATE_TOTAL_SCORE':
			return {
				...state,
				totalScore: action.payload }

		case 'UPDATE_TODAY_SCORE':
			return {
				...state,
				todayScore: action.payload }

		case 'UPDATE_EXERCISES_COMPLETE':
			return {
				...state,
				exercisesComplete: action.payload }

		case 'UPDATE_TESTS_COMPLETE':
			return {
				...state,
				testsComplete: action.payload }

		case 'UPDATE_WORDS_TOTAL':
			return {
				...state,
				wordsTotal: action.payload }

		case 'UPDATE_WORDS_REMAINING':
			return {
				...state,
				wordsRemaining: action.payload }

		case 'UPDATE_WORDS_STUDIED':
			return {
				...state,
				wordsStudied: action.payload }

		case 'UPDATE_ENG_TO_RUS':
			let words = [...state.engToRusWords];
			words.push(action.payload);		
			return {
				...state,
				engToRusWords: words }

		case 'UPDATE_RUS_TO_ENG':
			return {
				...state,
				rusToEngWords: [...state.rusToEngWords, action.payload] }

		case 'UPDATE_AUDIO_WORDS':
			return {
				...state,
				audioWords: [...state.audioWords, action.payload] }

		case 'UPDATE_CONSTRUCT_WORDS':
			return {
				...state,
				constructWords: [...state.constructWords, action.payload] }

		case 'UPDATE_TRUE_OR_FALSE':
			return {
				...state,
				trueOrFalseWords: [...state.trueOrFalseWords, action.payload] }

		case 'UPDATE_CARD_WORDS':
			return {
				...state,
				cardWords: [...state.trueOrFalseWords, action.payload] }

		default: return state;		
	}
}

export default exercisesReducer;