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
	},
	changeColorScheme: function(val) {
		return {
			type: 'CHANGE_COLOR_SCHEME',
			payload: val
		}		
	},
	changeSoundVolume: function(val) {
		return {
			type: 'CHANGE_SOUND_VOLUME',
			payload: val
		}		
	},
	toggleVocabModal: function(val) {
		return {
			type: 'TOGGLE_VOCAB_MODAL',
			payload: val
		}		
	},
	selectVocabWord: function(word) {
		return {
			type: 'SELECT_VOCAB_WORD',
			payload: word
		}
	},
	voiceVocabWord: function(word) {
		return {
			type: 'VOICE_VOCAB_WORD',
			payload: word
		}		
	},
	selectBook: function(book) {
		return {
			type: 'SELECT_BOOK',
			payload: book
		}		
	},
	selectFontSize: function(fontSize) {
		return {
			type: 'SELECT_FONT_SIZE',
			payload: fontSize
		}		
	},
	selectFontFamily: function(fontFamily) {
		return {
			type: 'SELECT_FONT_FAMILY',
			payload: fontFamily
		}		
	},
	selectFontSpacing: function(fontSpacing) {
		return {
			type: 'SELECT_FONT_SPACING',
			payload: fontSpacing
		}		
	},
	selectFontWeight: function(fontWeight) {
		return {
			type: 'SELECT_FONT_WEIGHT',
			payload: fontWeight
		}		
	},				
	selectFontColor: function(fontColor) {
		return {
			type: 'SELECT_FONT_COLOR',
			payload: fontColor
		}		
	},
	selectBgColor: function(bgColor) {
		return {
			type: 'SELECT_BG_COLOR',
			payload: bgColor
		}		
	},
	addCommentToBook: function(id,comment) {
		return {
			type: 'ADD_COMMENT_TO_BOOK',
			payload: {id, comment}
		}		
	}			

}

export default actions;