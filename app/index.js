import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			a:2,
		}



	}






    render() {
        return <canvas id="game" width="960" height="480"></canvas>;
    }
}

render(<App/>, document.getElementById('app'));
