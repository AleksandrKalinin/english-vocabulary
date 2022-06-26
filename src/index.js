import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GrammarList from './GrammarList'
import Statistics from './Statistics'
import CoursesList from './CoursesList'
import Training from './Training'
import Main from './Main'
import CoursesSimple from './CoursesSimple'
import ConstructWord from './ConstructWord'
import Proverbs from './Proverbs'
import Cards from './Cards'
import Audio from './Audio'
import EnglishToRussian from './EnglishToRussian'
import RussianToEnglish from './RussianToEnglish'
import Videos from './Videos'
import Fragments from './Fragments'
import Pronunciation from './Pronunciation'
import RecreateText from './RecreateText'
import RecreateAudioText from './RecreateAudioText'
import InsertSpaces from './InsertSpaces'
import TED from './videos/TED'
import EngVid from './videos/EngVid'
import BritishCouncil from './videos/BritishCouncil'
import Khan from './videos/Khan'
import Coursera from './videos/Coursera'
import JimmyFallon from './videos/JimmyFallon'
import JimmyKimmel from './videos/JimmyKimmel'
import ConanOBrien from './videos/ConanOBrien'
import Ellen from './videos/Ellen'
import JamesCorden from './videos/JamesCorden'
import SethMeyers from './videos/SethMeyers'
import StephenColbert from './videos/StephenColbert'
import TextsList from './TextsList'
import Decks from './Decks'
import AudioList from './AudioList'
import Settings from './Settings'
import BookList from './BookList'
import Materials from './Materials'
import Example from './Example'
import Rightwrong from './Rightwrong'
import GrammarItem from './grammar/GrammarItem'
import GrammarPresentSimple from './grammar/GrammarPresentSimple'
import GrammarPastSimple from './grammar/GrammarPastSimple'
import GrammarFutureSimple from './grammar/GrammarFutureSimple'
import GrammarPresentContinuous from './grammar/GrammarPresentContinuous'
import GrammarPastContinuous from './grammar/GrammarPastContinuous'
import GrammarFutureContinuous from './grammar/GrammarFutureContinuous'
import GrammarPresentPerfect from './grammar/GrammarPresentPerfect'
import GrammarFuturePerfect from './grammar/GrammarFuturePerfect'
import GrammarPastPerfect from './grammar/GrammarPastPerfect'
import GrammarPresentPerfectContinuous from './grammar/GrammarPresentPerfectContinuous'
import GrammarPastPerfectContinuous from './grammar/GrammarPastPerfectContinuous'
import GrammarFuturePerfectContinuous from './grammar/GrammarFuturePerfectContinuous'
import AudioPlayer from './AudioPlayer'
import {BrowserRouter as Router, Route } from "react-router-dom";



ReactDOM.render(  
	<Router>
	<div className="router-wrapper">
	<Route exact path="/" component={Main}/>
	<Route path="/vocab" component={App} />
	<Route path="/settings" component={Settings} />
	<Route path="/grammar" component={GrammarList} />
	<Route path="/materials" component={Materials} />
	<Route path="/statistics" component={Statistics} />
	<Route path="/courses" component={CoursesList} />
	<Route path="/coursessimple" component={CoursesSimple} />
	<Route path="/training" component={Training} />		  
	<Route path="/cards" component={Cards} />
	<Route path="/rightwrong" component={Rightwrong} />		
	<Route path="/constructword" component={ConstructWord} />
	<Route path="/proverbs" component={Proverbs}/>
	<Route path="/audio" component={Audio} />
	<Route path="/pronunciation" component={Pronunciation} />
	<Route path="/recreatetext" component={RecreateText} />
	<Route path="/recreateaudiotext" component={RecreateAudioText} />
	<Route path="/insertspaces" component={InsertSpaces} />						
	<Route path="/englishtorussian" component={EnglishToRussian} />
	<Route path="/russiantoenglish" component={RussianToEnglish} />
	<Route path="/videos" component={Videos} />
	<Route path="/fragments" component={Fragments} />
	<Route path="/decks" component={Decks} />		
	<Route path="/ted" component={TED} />
	<Route path="/engvideo" component={EngVid} />
	<Route path="/britishcouncil" component={BritishCouncil} />
	<Route path="/khan" component={Khan} />
	<Route path="/conanobrien" component={ConanOBrien} />
	<Route path="/jimmyfallon" component={JimmyFallon} />
	<Route path="/jimmykimmel" component={JimmyKimmel} />
	<Route path="/coursera" component={Coursera} />
	<Route path="/ellen" component={Ellen} />
	<Route path="/stephencolbert" component={StephenColbert} />
	<Route path="/jamescorden" component={JamesCorden} />
	<Route path="/sethmeyers" component={SethMeyers} />
	<Route path="/texts" component={TextsList} />
	<Route path="/books" component={BookList} />		
	<Route path="/tests" component={Example} />
	<Route path="/audiolist" component={AudioList} />
	<Route path="/grammarpresentsimple" component={GrammarPresentSimple} />
	<Route path="/grammarpastsimple" component={GrammarPastSimple} />
	<Route path="/grammarfuturesimple" component={GrammarFutureSimple} />
	<Route path="/grammarpresentcontinuous" component={GrammarPresentContinuous} />
	<Route path="/grammarpastcontinuous" component={GrammarPastContinuous} />
	<Route path="/grammarfuturecontinuous" component={GrammarFutureContinuous} />
	<Route path="/grammarpresentperfect" component={GrammarPresentPerfect} />
	<Route path="/grammarpastperfect" component={GrammarPastPerfect} />
	<Route path="/grammarfutureperfect" component={GrammarFuturePerfect} />
	<Route path="/grammarpresentperfectcontinuous" component={GrammarPresentPerfectContinuous} />
	<Route path="/grammarpastperfectcontinuous" component={GrammarPastPerfectContinuous} />
	<Route path="/grammarfutureperfectcontinuous" component={GrammarFuturePerfectContinuous} />
	<Route path="/audioplayer" component={AudioPlayer} />
	</div>
	</Router>, document.getElementById('root'));

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