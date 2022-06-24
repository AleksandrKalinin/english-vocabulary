import React, { Component, Fragment } from 'react';
import { List, Button, Container} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import TopMenu from './TopMenu'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

class Chart extends Component {
	constructor(props){
		super(props);
		this.state = {
			words: [],
			data: [
					  {
					    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
					  },
					  {
					    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
					  },
					  {
					    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
					  },
					  {
					    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
					  },
					  {
					    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
					  },
					  {
					    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
					  },
					  {
					    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
					  }
				]
		};
	
	}



	componentDidMount() {
	    axios.get('/vocabulary2.json')
	      .then(res => {
	        const words = res.data;
	        this.setState({ words });
	      })
	  }

/*
  render() {
    return (
      <LineChart
        width={500}
        height={300}
        data={this.state.data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
    );
  }
}

 */

   consoleState = ()=>{
   	console.log(this.state)
   }

  render() {
	//const {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} = Recharts;
    return (
    	<Fragment>
	    	<div className="content-wrapper">
	    		<TopMenu></TopMenu>
				<LineChart
				width={500}
				height={300}
				data={this.state.data}
				margin={{
					top: 5, right: 30, left: 20, bottom: 5,
				}}
				>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
				<Line type="monotone" dataKey="uv" stroke="#82ca9d" />
				</LineChart>

	    	</div>
	    	<footer></footer>
	    </Fragment>	
	);
  }
}

export default Chart;
