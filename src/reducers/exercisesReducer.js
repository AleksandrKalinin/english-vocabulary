let initialState = {
	"exercises": {
		"engToRusWords": 
			[
				{
					"id": 234,
					"date": "Sun Jul 27 2022 21:07:21 GMT+0300 (Москва, стандартное время)",
					"wordsTrained": [32, 47, 987],
					"score": 3
				},
				{
					"id": 34,
					"date": "Sun Jul 23 2022 20:07:21 GMT+0300 (Москва, стандартное время)",
					"wordsTrained": [32, 47, 987],
					"score": 3
				}
			],
		"rusToEngWords":
			[
				{
					"id": 234,
					"date": "Sun Jul 27 2022 21:07:21 GMT+0300 (Москва, стандартное время)",
					"wordsTrained": [32, 47, 987],
					"score": 3
				},
				{
					"id": 34,
					"date": "Sun Jul 23 2022 20:07:21 GMT+0300 (Москва, стандартное время)",
					"wordsTrained": [32, 47, 987],
					"score": 3
				}
			],
		"audioWords": 
			[
				{
					"id": 234,
					"date": "Sun Jul 27 2022 21:07:21 GMT+0300 (Москва, стандартное время)",
					"wordsTrained": [32, 47, 987],
					"score": 3
				},
				{
					"id": 34,
					"date": "Sun Jul 23 2022 20:07:21 GMT+0300 (Москва, стандартное время)",
					"wordsTrained": [32, 47, 987],
					"score": 3
				}
			],

		"constructWords": 
			[
				{
					"id": 234,
					"date": "Sun Jul 27 2022 21:07:21 GMT+0300 (Москва, стандартное время)",
					"wordsTrained": [32, 47, 987, 15, 16, 19, 20],
					"score": 7
				},
				{
					"id": 34,
					"date": "Sun Jul 23 2022 20:07:21 GMT+0300 (Москва, стандартное время)",
					"wordsTrained": [32, 47, 987],
					"score": 3
				}
			],

		"trueOrFalseWords": 
			[
				{
					"id": 234,
					"date": "Sun Jul 27 2022 21:07:21 GMT+0300 (Москва, стандартное время)",
					"wordsTrained": [32, 47, 987, 14],
					"score": 4
				},
				{
					"id": 34,
					"date": "Sun Jul 23 2022 20:07:21 GMT+0300 (Москва, стандартное время)",
					"wordsTrained": [32, 47, 987],
					"score": 3
				}
			],

		"cardWords":
			[
				{
					"id": 234,
					"date": "Sun Jul 27 2022 21:07:21 GMT+0300 (Москва, стандартное время)",
					"wordsTrained": [32, 47, 987],
					"score": 3
				},
				{
					"id": 34,
					"date": "Sun Jul 23 2022 20:07:21 GMT+0300 (Москва, стандартное время)",
					"wordsTrained": [32, 47, 987, 43, 89],
					"score": 5
				}								
			],

		"recreateTxt":
			[
				{
					"id": 234,
					"date": "Sun Jul 27 2022 21:07:21 GMT+0300 (Москва, стандартное время)",
					"score": 5
				},
				{
					"id": 34,
					"date": "Sun Jul 23 2022 20:07:21 GMT+0300 (Москва, стандартное время)",
					"score": 5
				}
			],
		
		"recreateAudioTxt":
			[
				{
					"id": 234,
					"date": "Sun Jul 27 2022 21:07:21 GMT+0300 (Москва, стандартное время)",
					"score": 5
				},
				{
					"id": 34,
					"date": "Sun Jul 23 2022 20:07:21 GMT+0300 (Москва, стандартное время)",
					"score": 5
				}
			],
		
		"placeSpaces":
			[
				{
					"id": 234,
					"date": "Sun Jul 27 2022 21:07:21 GMT+0300 (Москва, стандартное время)",
					"score": 6
				},
				{
					"id": 34,
					"date": "Sun Jul 23 2022 20:07:21 GMT+0300 (Москва, стандартное время)",
					"score": 7
				}
			],
		 
		"fillTheGaps":
			[
				{
					"id": 234,
					"date": "Sun Jul 27 2022 21:07:21 GMT+0300 (Москва, стандартное время)",
					"score": 5
				},
				{
					"id": 34,
					"date": "Sun Jul 23 2022 20:07:21 GMT+0300 (Москва, стандартное время)",
					"score": 5
				}
			],
		
		"commonPhrases":
			[
				{
					"id": 234,
					"date": "Sun Jul 27 2022 21:07:21 GMT+0300 (Москва, стандартное время)",
					"score": 5
				},
				{
					"id": 34,
					"date": "Sun Jul 23 2022 20:07:21 GMT+0300 (Москва, стандартное время)",
					"score": 5
				}
			]
					 		 												
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


	"totalScore": 187,
	"exercisesComplete": 22,
	"testsComplete": 2

};



let exercisesReducer = (state = initialState, action) => {
	switch(action.type){
		case 'UPDATE_TOTAL_SCORE':
			return {
				...state,
				totalScore: action.payload }

		case 'UPDATE_EXERCISES_COMPLETE':
			return {
				...state,
				exercisesComplete: action.payload }

		case 'UPDATE_TESTS_COMPLETE':
			return {
				...state,
				testsComplete: action.payload }

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