let initialState = {
	"exercises": {
		"engToRusWords": {
			"completed": 1,
			"wordsTrained": [
				{
					"id": 234,
					"date": "Sun Jul 27 2022 21:07:21 GMT+0300 (Москва, стандартное время)"
				},
				{
					"id": 34,
					"date": "Sun Jul 23 2022 20:07:21 GMT+0300 (Москва, стандартное время)"
				}
			]
		},
		"rusToEngWords": {
			"completed": 3,
			"wordsTrained": [
				{
					"id": 234,
					"date": "Sun Jul 26 2022 21:07:21 GMT+0300 (Москва, стандартное время)"
				},
				{
					"id": 34,
					"date": "Sun Jul 25 2022 20:07:21 GMT+0300 (Москва, стандартное время)"
				}
			]
		},
		"audioWords": {
			"completed": 4,
			"wordsTrained": [
				{
					"id": 234,
					"date": "Sun Jul 14 2022 21:07:21 GMT+0300 (Москва, стандартное время)"
				},
				{
					"id": 34,
					"date": "Sun Jul 18 2022 20:07:21 GMT+0300 (Москва, стандартное время)"
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
					"date": "Sun Jul 26 2022 20:07:21 GMT+0300 (Москва, стандартное время)"
				}
			]
		},
		"trueOrFalseWords": {
			"completed": 5,
			"wordsTrained": [
				{
					"id": 234,
					"date": "Sun May 24 2022 21:07:21 GMT+0300 (Москва, стандартное время)"
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
		},
		"recreateTxt": {
			"completed": 5,
			"wordsTrained": [
				{
					"id": 234,
					"date": "Sun May 24 2022 21:07:21 GMT+0300 (Москва, стандартное время)"
				},
				{
					"id": 34,
					"date": "Sun Jul 24 2022 20:07:21 GMT+0300 (Москва, стандартное время)"
				}
			]
		},
		"recreateAudioTxt": {
			"completed": 5,
			"wordsTrained": [
				{
					"id": 234,
					"date": "Sun May 24 2022 21:07:21 GMT+0300 (Москва, стандартное время)"
				},
				{
					"id": 34,
					"date": "Sun Jul 24 2022 20:07:21 GMT+0300 (Москва, стандартное время)"
				}
			]
		},
		"placeSpaces": {
			"completed": 5,
			"wordsTrained": [
				{
					"id": 234,
					"date": "Sun May 24 2022 21:07:21 GMT+0300 (Москва, стандартное время)"
				},
				{
					"id": 34,
					"date": "Sun Jul 24 2022 20:07:21 GMT+0300 (Москва, стандартное время)"
				}
			]
		}, 
		"fillTheGaps": {
			"completed": 5,
			"wordsTrained": [
				{
					"id": 234,
					"date": "Sun May 24 2022 21:07:21 GMT+0300 (Москва, стандартное время)"
				},
				{
					"id": 34,
					"date": "Sun Jul 24 2022 20:07:21 GMT+0300 (Москва, стандартное время)"
				}
			]
		},
		"commonPhrases": {
			"completed": 5,
			"wordsTrained": [
				{
					"id": 234,
					"date": "Sun May 24 2022 21:07:21 GMT+0300 (Москва, стандартное время)"
				},
				{
					"id": 34,
					"date": "Sun Jul 24 2022 20:07:21 GMT+0300 (Москва, стандартное время)"
				}
			]
		},						 		 												
	},

	"tests": [
		{
			"score": 35,
			"date": "Sun Jul 27 2022 21:07:21 GMT+0300 (Москва, стандартное время)",
			"percentage": 82.5
		},
		{
			"score": 38,
			"date": "Sun Jul 20 2022 21:07:21 GMT+0300 (Москва, стандартное время)",
			"percentage": 34.5
		},
	],


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