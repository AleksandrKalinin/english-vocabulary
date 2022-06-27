let actions = {
	updateTotalScore: function(score) {
		return {
			type: 'UPDATE_TOTAL_SCORE',
			payload: score
		}
	},
	updateTodayScore: function(score) {
		return {
			type: 'UPDATE_TODAY_SCORE',
			payload: score
		}		
	},
	updateExerciseScore: function(number) {
		return {
			type: 'UPDATE_EXERCISES_COMPLETE',
			payload: number
		}		
	},
	updateTestsScore: function(number) {
		return {
			type: 'UPDATE_TESTS_COMPLETE',
			payload: number
		}		
	},
	updateWordsTotal: function(number) {
		return {
			type: 'UPDATE_WORDS_TOTAL',
			payload: number
		}		
	},
	updateWordsRemaining: function(number) {
		return {
			type: 'UPDATE_WORDS_REMAINING',
			payload: number
		}		
	},
	updateWordsStudied: function(number) {
		return {
			type: 'UPDATE_WORDS_STUDIED',
			payload: number
		}		
	}					
}

export default actions;