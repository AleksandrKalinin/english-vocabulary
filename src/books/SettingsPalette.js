import React, {Component} from 'react';

class SettingsPalette extends Component {

	constructor(props){
		super(props);
		this.state={
			activeFontColor: '#222222',
			activeBgColor: '#f6f6f6',
			fontState: [false,false,true,false,false,false,false,false,false,false,false,false,false,false,false,false],
			bgState: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,false],
			colorScheme: [
				'#000000',
				'#111111',
				'#222222',
				'#333333',
				'#444444',
				'#555555',
				'#666666',
				'#777777',
				'#888888',
				'#999999',
				'#a7a7a7',
				'#b8b8b8',
				'#d0d0d0',
				'#dcdcdc',
				'#f6f6f6',
				'#ffffff'
			]
		}
	}

	componentDidMount(){
		this.setState({ color: this.props.color, 
						backgroundColor: this.props.backgroundColor,
						fontState: this.props.fontState,
						bgState: this.props.bgState })
	}

	closeModal = () =>{
		this.props.callbackModal('settingsPalette');
	}

	setFontColor = (e) =>{
		let fontState = this.state.fontState.slice();
		let index = e.currentTarget.getAttribute("data-index");
		for (var i = 0; i < fontState.length; i++) {
			fontState[i] = false;
		}
		fontState[index] = true;
		this.setState({
			activeFontColor: e.currentTarget.getAttribute("colorvalue"),
			fontState
		})
	}

	setBgColor = (e) =>{
		let bgState = this.state.bgState.slice();
		let index = e.currentTarget.getAttribute("data-index");
		for (var i = 0; i < bgState.length; i++) {
			bgState[i] = false
		}
		bgState[index] = true;
		this.setState({
			activeBgColor: e.currentTarget.getAttribute("colorvalue"),
			bgState
		})
	}

	applyChanges = () =>{
		this.props.changeFontColor(this.state.activeFontColor);
		this.props.changeBackgroundColor(this.state.activeBgColor);
		this.props.callbackModal('settingsPalette');
		this.props.changeBgState(this.state.bgState);
		this.props.changeFontState(this.state.fontState);
	}

	consoleState = () =>{
		console.log(this.state)
	}
	
	render(){

	  return (
		<div className="settings-overlay">
			<div className="select-palette-wrapper">
				<span className="close-button" onClick={this.closeModal} >
					<i className="fas fa-times"></i>
				</span>
				<div className="select-palette-container">
					<div className="palette-container-item">
						<p>Шрифт</p>
						<div className="select-palette">
							{this.state.colorScheme.map((item,index) =>
								<div key={index} className="palette-item" data-index={index} onClick={this.setFontColor} style={{ backgroundColor: item }} colorvalue={item}>
									{this.state.fontState[index] ? 
										<span><i className="fas fa-check"></i></span>  : null
									}
								</div>
							)}
						</div>
					</div>
					<div className="palette-container-item">
						<p>Фон</p>
						<div className="select-palette">
							{this.state.colorScheme.map((item,index) =>
								<div key={index} className="palette-item" data-index={index} onClick={this.setBgColor} style={{ backgroundColor: item }} colorvalue={item}>
									{this.state.bgState[index] ?
										<span><i className="fas fa-check"></i></span> 
										 : null
									}
								</div>
							)}					
						</div>
					</div>
				</div>
				<div className="palette-item-selected" style={{ backgroundColor: this.state.activeBgColor }} >
					<span style={{ color: this.state.activeFontColor  }} >Lorem ipsum </span>
				</div>								
				<button className="normal-button" onClick={this.applyChanges} >Применить</button>					 
			</div> 
	
		</div>
	  );

	}

}

export default SettingsPalette;
