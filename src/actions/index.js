let actions = {
	//resultsReducer
	updateTotalScore: function(score) {
		return {
			type: 'UPDATE_TOTAL_SCORE',
			payload: score
		}
	},
	updateExerciseComplete: function(number) {
		return {
			type: 'UPDATE_EXERCISES_COMPLETE',
			payload: number
		}		
	},
	updateTestsComplete: function(number) {
		return {
			type: 'UPDATE_TESTS_COMPLETE',
			payload: number
		}		
	},
	//testsReducer
	updateTests: function(val) {
		return {
			type: 'UPDATE_TESTS',
			payload: val
		}		
	},
	//settingsReducer
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
	//vocabularyReducer
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
	//booksReducer
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
	selectFontSpacing: function(lineHeight) {
		return {
			type: 'SELECT_FONT_SPACING',
			payload: lineHeight
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
	selectBgColor: function(backgroundColor) {
		return {
			type: 'SELECT_BG_COLOR',
			payload: backgroundColor
		}		
	},
	addCommentToBook: function(id, comment) {
		return {
			type: 'ADD_COMMENT_TO_BOOK',
			payload: {id, comment}
		}		
	},
	toggleFontModal: function(state) {
		return {
			type: 'TOGGLE_FONT_MODAL',
			payload: state
		}		
	},
	toggleColorModal: function(state) {
		return {
			type: 'TOGGLE_COLOR_MODAL',
			payload: state
		}		
	},
	toggleSearchModal: function(state) {
		return {
			type: 'TOGGLE_SEARCH_MODAL',
			payload: state
		}		
	},
	//exercisesReducer
	updateEngToRus: function(word) {
		return {
			type: 'UPDATE_ENG_TO_RUS',
			payload: word
		}		
	},
	updateRusToEng: function(word) {
		return {
			type: 'UPDATE_RUS_TO_ENG',
			payload: word
		}		
	},
	updateConstructedWords: function(word) {
		return {
			type: 'UPDATE_CONSTRUCT_WORDS',
			payload: word
		}		
	},
	updateAudioWords: function(word) {
		return {
			type: 'UPDATE_AUDIO_WORDS',
			payload: word
		}		
	},

	updateCardWords: function(word) {
		return {
			type: 'UPDATE_CARD_WORDS',
			payload: word
		}		
	},

	updateTrueOrFalse: function(word) {
		return {
			type: 'UPDATE_TRUE_OR_FALSE',
			payload: word
		}		
	},

	updateRecreateTxt: function(value) {
		return {
			type: 'UPDATE_RECREATE_TXT',
			payload: value
		}		
	},

	updateRecreateAudioTxt: function(value) {
		return {
			type: 'UPDATE_RECREATE_AUDIOTXT',
			payload: value
		}		
	},

	updateFillTheGaps: function(value) {
		return {
			type: 'UPDATE_FILL_THE_GAPS',
			payload: value
		}		
	},

	updatePlaceSpaces: function(value) {
		return {
			type: 'UPDATE_PLACE_SPACES',
			payload: value
		}		
	},	

	updateCommonPhrases: function(value) {
		return {
			type: 'UPDATE_COMMON_PHRASES',
			payload: value
		}		
	}	

}

export default actions;