import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

export default class QuestionDetails extends Component {
	state = {
		id: null,
	}
	componentDidMount() {
		const { match: { params } } = this.props;
		this.setState({id : params.qnId})
	}
	render() {
		return (
			<Router>
				<h1>{this.state.id}</h1>
			</Router>
		);
	}
}
