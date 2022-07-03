import React, {Component, Fragment} from 'react';
import axios from 'axios'
import SettingsFont from './SettingsFont'
import SettingsPalette from './SettingsPalette'

class ActiveBook extends Component {
	
	constructor(props){
		super(props);
		this.myRef = React.createRef();
		this.state = {
			text: '',
			pageIndexes: [],
			currentPageId: 0,
			loaded: false,
			settingsFont: false,
			SettingsPalette: false,
			fontSize: '16px',
			fontFamily: "'Times New Roman', sans-serif",
			lineHeight: '32px',
			fontWeight: 400,
			backgroundColor: '#f6f6f6',
			color: '#222222',
			pages: 0,
			fontState: [false,false,true,false,false,false,false,false,false,false,false,false,false,false,false,false],
			bgState: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,false],

		}
	}

	componentDidMount(){
		axios.get('/books/' + this.props.link)
			.then(res => {
				this.setState({
					text: res.data.toString().split("\n")
				}, () => this.showBook() )
			})
	}

	consoleState = () =>{
		console.log(this.state);
	}

	openSettings = (value) =>{
		this.setState({
			[value]: !this.state[value]
		} )
	}

	splitIntoPages = () =>{
		let text = this.state.text;
		let pagesArray = []; let indexArray = [];
		let value = 1600 / this.state.lineHeight.slice(0, -2);
		let pages = Math.ceil(text.length / value);
    	let currentMin = 0;
    	let currentMax = 50;
    	for (var i = 0; i < pages; i++) {
    		pagesArray.push(text.slice(currentMin,currentMax));
    		currentMin = currentMin + 50;
    		currentMax = currentMax + 50;
    	}
    	for (var i = 0; i < pages; i++) {
    		indexArray.push(i);
    	}
    	this.setState({ pages: pagesArray, pageIndexes: indexArray, currentPage: pagesArray[0] });
	}

    prevButton = () =>{
      let currentPageId = this.state.currentPageId;
      let pages = this.state.pages;
      if(currentPageId > 0){
      	currentPageId--;
      }
      let currentPage = pages[currentPageId];
      this.setState({
          currentPageId,
          currentPage
      }, () => this.scrollToTop() )
    }

    nextButton = () =>{
      let currentPageId = this.state.currentPageId;
      let pages = this.state.pages.slice();
      if(currentPageId < pages.length - 1){
      	currentPageId++;
      }
      let currentPage = pages[currentPageId];
      this.setState({
          currentPageId,
          currentPage
      }, () => this.scrollToTop())
    } 

    scrollToTop = () =>{
      window.scrollTo(0, this.myRef.offsetTop)
    }   

    selectPage = (e) => {
    	let pages = this.state.pages.slice();
    	let currentPageId = e.target.value - 1;
    	let currentPage = pages[currentPageId];
    	this.setState({
    		currentPageId, currentPage 
    	}) 
    } 

	showBook = () =>{
		this.splitIntoPages();
		this.setState({ loaded: true })
	}

	callbackCloseModal = (value) =>{
		this.setState({[value]: !this.state[value]})
	}

	callbackChangeFont = (fontSize) =>{
		this.setState({ fontSize: fontSize + 'px' })
	}

	callbackChangeFontFamily = (fontFamily) =>{
		this.setState({ fontFamily })
	}

	callbackChangeLineHeight = (lineHeight) =>{
		this.setState({ lineHeight: lineHeight + 'px' })
	}

	callbackChangeFontWeight = (fontWeight) =>{
		this.setState({ fontWeight })
	}

	callbackChangeFontColor = (color) =>{
		this.setState({ color })
	}

	callbackChangeBackgroundColor = (backgroundColor) =>{
		this.setState({ backgroundColor })
	}

	callbackChangeFontState = (fontState) =>{
		this.setState({ fontState })
	}

	callbackChangeBgState = (bgState) =>{
		this.setState({ bgState })
	}	

	changePage = (e) =>{
      let currentPageId = Number(e.target.value);
      console.log(currentPageId);
      let pages = this.state.pages;
      let currentPage = pages[currentPageId];
      this.setState({
          currentPageId, currentPage
      }) 	
	}

	render(){

	  return (
	  	<Fragment>
	  		{this.state.settingsFont? <SettingsFont value = {this.state.fontSize}
	  												fontFamily = {this.state.fontFamily}
	  												lineHeight = {this.state.lineHeight}
	  												fontWeight = {this.state.fontWeight}
	  												callbackModal = {this.callbackCloseModal} 
	  												changeFont={this.callbackChangeFont}
	  												changeFontFamily={this.callbackChangeFontFamily}
	  												changeLineHeight={this.callbackChangeLineHeight}
	  												changeFontWeight={this.callbackChangeFontWeight} /> : null }
	  		{this.state.settingsPalette ? <SettingsPalette
	  												color = {this.state.color}
	  												backgroundColor= {this.state.backgroundColor} 
	  												fontState = {this.state.fontState}
	  												bgState = {this.state.bgState}	  		 
	  												callbackModal = {this.callbackCloseModal} 
	  												changeFontColor={this.callbackChangeFontColor} 
	  												changeBackgroundColor={this.callbackChangeBackgroundColor} 
	  												changeFontState= {this.callbackChangeFontState} 
	  												changeBgState = {this.callbackChangeBgState}/> : null }
	  		{this.state.settingsVisible ? null :
		  		<div className="main-container">
			  		<div className="container">
			  			<div className="row">
			  				<div className="col-md-12 inner-book">
			  					{this.state.loaded ?
								<div className="single-book-content">
									<div className="book-settings-panel" style={{ backgroundColor: this.state.backgroundColor, color: this.state.color }}>
										<div className="settings-block settings-close" title="Закрыть" onClick={this.props.closeBook} >
											<i className="fas fa-times"></i>
										</div>										
									</div>
									<div className="book-nav-panel" >									
										<div className="nav-progress-bar">
											<input  type="range" 
													value={this.state.currentPageId} 
													max={this.state.pages.length - 1} 
													min="0"
													onChange={this.changePage} />
												<div className="nav-pagination">{this.state.currentPageId + 1} / {this.state.pages.length}</div>	 
										</div>
										<div className="nav-buttons">
											<div className="nav-wrapper" onClick={this.prevButton}>
												<span ><i className="fas fa-arrow-left"></i></span>
											</div>
											<div className="nav-wrapper" onClick={this.nextButton}>
												<span ><i className="fas fa-arrow-right"></i></span>
											</div>
											<div className="settings-block" title="Change font" onClick={this.openSettings.bind(this, 'settingsFont')} >
												<i className="fas fa-font"></i>
											</div>
											<div className="settings-block" title="Change palette" onClick={this.openSettings.bind(this, 'settingsPalette')}>
												<i className="fas fa-palette"></i>
											</div>											
										</div>																										
									</div>																		
									<div className="single-book-text active-book-text" style={{ color: this.state.color, backgroundColor: this.state.backgroundColor }} >
										<h2>{this.props.title}</h2>
										<h5>By: {this.props.author}</h5>
										<div className="single-text-main" style={{ lineHeight: this.state.lineHeight,
																				   fontWeight: this.state.fontWeight, 
																				   fontSize: this.state.fontSize, 
																				   fontFamily: this.state.fontFamily }} >{this.state.currentPage.map((item,index) => <p key={index}>{item}</p> )}</div>
									</div>			
									<div className="book-nav-panel" >									
										<div className="nav-progress-bar">
											<input  type="range" 
													value={this.state.currentPageId - 1} 
													max={this.state.pages.length} 
													min="0"
													onChange={this.changePage} />
												<div className="nav-pagination">{this.state.currentPageId + 1} / {this.state.pages.length}</div>	 
										</div>
										<div className="nav-buttons">
											<div className="nav-wrapper" onClick={this.prevButton}>
												<span ><i className="fas fa-arrow-left"></i></span>
											</div>
											<div className="nav-wrapper" onClick={this.nextButton}>
												<span ><i className="fas fa-arrow-right"></i></span>
											</div>
											<div className="settings-block" title="Change font" onClick={this.openSettings.bind(this, 'settingsFont')} >
												<i className="fas fa-font"></i>
											</div>
											<div className="settings-block" title="Change palette" onClick={this.openSettings.bind(this, 'settingsPalette')}>
												<i className="fas fa-palette"></i>
											</div>											
										</div>																										
									</div>		
								</div> 
								: <div className="single-book-fetching">Loading...</div>}
			  				</div>
			  			</div>
			  		</div>	  			
		  		</div>
			}
	  	</Fragment>
	  );

	}

}

export default ActiveBook;
