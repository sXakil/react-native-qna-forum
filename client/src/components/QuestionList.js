import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Question from './Question';
export default class QuestionList extends Component {
	state = {
		questions       : [],
		showDeleteModal : false,
	};
	fetchQuestions = () => {
		fetch('http://localhost:3001/qn')
			.then((data) => data.json())
			.then((res) => this.setState({ questions: res }))
			.catch((e) => console.warn(e));
	};
	handleEditThis = async (id) => {};
	componentDidMount() {
		this.fetchQuestions();
	}

	render() {
		return (
			<Container style={{ marginTop: 10 }}>
				{this.state.questions.map((question, index) => <Question {...question} key={index} />)}
			</Container>
		);
	}
}
