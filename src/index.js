import React from 'react';
import ReactDOM from 'react-dom';
import Vocabulary from './Vocabulary';
import GrammarList from './GrammarList'
import SelectedGrammar from './SelectedGrammar'
import Statistics from './Statistics'
import Training from './Training'
import Main from './Main'
import ConstructWord from './ConstructWord'
import Proverbs from './Proverbs'
import Cards from './Cards'
import Audio from './Audio'
import EnglishToRussian from './EnglishToRussian'
import RussianToEnglish from './RussianToEnglish'
import Videos from './Videos'
import FillTheGaps from './FillTheGaps'
import RecreateText from './RecreateText'
import RecreateAudioText from './RecreateAudioText'
import InsertSpaces from './InsertSpaces'
import SelectedVideo from './SelectedVideo'
import TextsList from './TextsList'
import Decks from './Decks'
import Settings from './Settings'
import BookList from './BookList'
import Materials from './Materials'
import Tests from './Tests'
import TrueOrFalse from './TrueOrFalse'
import AudioPlayer from './AudioPlayer'
import SelectedBook from './SelectedBook'
import {BrowserRouter as Router, Route } from "react-router-dom";

import {Provider} from "react-redux";
import configureStore from "./store/index";

let initialState = [];
let store = configureStore(initialState);

ReactDOM.render(  
	<Provider store={store}>
		<Router basename={process.env.PUBLIC_URL}>
			<div className="router-wrapper">
				<Route exact path="/" component={Main} />
				<Route path="/selectedbook" component={SelectedBook} />
				<Route path="/settings" component={Settings} />
				<Route path="/vocabulary" component={Vocabulary} />				
				<Route path="/grammar" exact component={GrammarList} />
				<Route path="/grammar/:id" component={SelectedGrammar} />
				<Route path="/materials" component={Materials} />
				<Route path="/statistics" component={Statistics} />
				<Route path="/training" component={Training} />		  
				<Route path="/cards" component={Cards} />
				<Route path="/trueorfalse" component={TrueOrFalse} />		
				<Route path="/constructword" component={ConstructWord} />
				<Route path="/proverbs" component={Proverbs}/>
				<Route path="/audio" component={Audio} />
				<Route path="/recreatetext" component={RecreateText} />
				<Route path="/recreateaudiotext" component={RecreateAudioText} />
				<Route path="/insertspaces" component={InsertSpaces} />						
				<Route path="/englishtorussian" component={EnglishToRussian} />
				<Route path="/russiantoenglish" component={RussianToEnglish} />
				<Route path="/fillthegaps" component={FillTheGaps} />
				<Route path="/decks" component={Decks} />		
				<Route path="/videos" exact component={Videos} />
				<Route path="/videos/:id" component={SelectedVideo} />
				<Route path="/texts" component={TextsList} />
				<Route path="/books" exact component={BookList} />
				<Route path="/books/:id" component={SelectedBook} />						
				<Route path="/tests" component={Tests} />
				<Route path="/audioplayer" component={AudioPlayer} />
			</div>
		</Router>	
	</Provider>, document.getElementById('root'));

/*
	const routes = [
		{
			path: '/',
			component: App
		},
		{
			path: '/grammar',
			component: GrammarList
		},
		{
			path: '/courses',
			component: CoursesList
		},
		{
			path: '/coursessimple',
			component: CoursesSimple
		},
		{
			path: '/training',
			component: Training
		},
		{
			path: '/constructword',
			component: ConstructWord
		},
		{
			path: '/cards',
			component: Cards
		},
		{
			path: '/audio',
			component: Audio
		},
		{
			path: '/pronunciation',
			component: Pronunciation
		},
		{
			path: '/englishtorussian',
			component: EnglishToRussian
		},
		{
			path: '/russiantoenglish',
			component: RussianToEnglish
		},
		{
			path: '/videos', 
			component: Videos
		},
		{
			path: '/ted', 
			component: TED
		},
		{
			path: '/engvid', 
			component: EngVid
		},
		{
			path: '/britishcouncil', 
			component: BritishCouncil
		},
		{
			path: '/khan', 
			component: Khan
		},
		{
			path: '/conanobrien', 
			component: ConanOBrien
		},
		{
			path: '/jimmyfallon', 
			component: JimmyFallon
		},
		{
			path: '/jimmykimmel', 
			component: JimmyKimmel
		},
		{
			path: '/coursera',
			component: Coursera
		},
		{
			path: '/ellen',
			component: Ellen
		},
		{
			path: '/stephencolbert',
			component: StephenColbert
		},
		{
			path: '/jamescorden',
			component: JamesCorden
		},
		{
			path: '/sethmeyers',
			component: SethMeyers
		},
		{
			path: '/texts',
			component: TextsList
		},
		{
			path: '/tests',
			component: Example
		}														
	]
	*/
/*
ReactDOM.render(  
  <Router>
	  <div className="router-wrapper">
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              component={route.component}
            />
          ))}
	  </div>
  </Router>, document.getElementById('root'));
*/