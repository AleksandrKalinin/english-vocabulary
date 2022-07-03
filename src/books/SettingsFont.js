import React, {Component} from 'react';

class SettingsFont extends Component {

	constructor(props){
		super(props);
		this.state={
			value: 16,
			fontFamily: "'Times New Roman', sans-serif",
			lineHeight: 32,
			fontWeight: 400
		}
	}

	componentDidMount(){
		this.setState({ value: this.props.value.slice(0, -2)})
		this.setState({ lineHeight: this.props.lineHeight.slice(0, -2)})
		this.setState({ fontWeight: this.props.fontWeight })
		this.setState({ fontFamily: this.props.fontFamily})
	}

	closeModal = () =>{
		this.props.callbackModal('settingsFont');
	}

	changeValue = (e) =>{
		this.setState({value: e.target.value})
	}

	applyChanges = () =>{
		this.props.callbackModal('settingsFont');
		this.props.changeFont(this.state.value);
		this.props.changeFontFamily(this.state.fontFamily);
		this.props.changeLineHeight(this.state.lineHeight);
		this.props.changeFontWeight(this.state.fontWeight);
		this.setState({fontFamily: this.props.fontFamily});
		this.setState({ value: this.props.value.slice(0, -2)})
	}

	changeFontFamily = (e) =>{
		this.setState({fontFamily: e.target.value})
	}

	changeFontWeight = (e) =>{
		this.setState({fontWeight: e.target.value})
	}

	changeLineHeight = (e) =>{
		this.setState({lineHeight: e.target.value})
	}		
	
	render(){

	  return (
		<div className="settings-overlay">
			<div className="select-palette-wrapper select-font-wrapper">
				<span className="close-button" onClick={this.closeModal}>
					<i className="fas fa-times"></i>
				</span>
				<div className="select-font">
					<div className="select-font-block">
						<span>Размер</span>
						<div className="select-font-input">
							<input onChange={this.changeValue} type="range" min="8" max="24" value={this.state.value} name=""/>								
							<span className="select-font-value">{this.state.value}</span>
						</div>
					</div>
					<div className="select-font-block">
						<span>Интервал</span>					
						<div className="select-font-input">
							<input onChange={this.changeLineHeight} type="range" min="16" max="72" value={this.state.lineHeight} name=""/>								
							<span className="select-font-value">{this.state.lineHeight}</span>
						</div>
					</div>
					<div className="select-font-block">
						<span>Жирность</span>
						<div className="select-font-input">
							<input onChange={this.changeFontWeight} type="range" min="200" max="900" step="100" value={this.state.fontWeight} name=""/>								
							<span className="select-font-value">{this.state.fontWeight}</span>
						</div>	
					</div>
				</div>
				<select className="select-font-family" onChange={this.changeFontFamily} value={this.state.fontFamily}>
					<option value ="'Times New Roman', sans-serif">Times New Roman</option>
					<option value ="'Arial', sans-serif">Arial</option>
					<option value ="'Verdana', sans-serif">Verdana</option>
					<option value ="'Lucida Console', sans-serif">Lucida Console</option>
					<option value ="'Georgia', serif">Georgia</option>
					<option value ="'Courier New', monospace">Gourier New</option>
				</select>
				<p className="select-font-example" style={{ fontSize: this.state.value + "px", 
															fontFamily: this.state.fontFamily,
															lineHeight: this.state.lineHeight + "px",
															fontWeight: this.state.fontWeight }} >Lorem ipsum dolor sit amet</p>									
				<button className="normal-button" onClick={this.applyChanges} >Применить</button>
			</div>
		
		</div>
	  );

	}

}

export default SettingsFont;
