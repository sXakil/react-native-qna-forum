import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Question from './Question';
import Loader from './Loader'

export default class QuestionList extends Component {
	state = {
		questions       : [],
		showDeleteModal: false,
		loading: true,
	};
	fetchQuestions = async () => {
		await fetch('http://localhost:3001/qn')
			.then((data) => data.json())
			.then((res) => this.setState({ questions: res }))
			.catch((e) => console.warn(e));
	};
	handleEditThis = async (id) => {};
	componentDidMount = async() => {
		await this.fetchQuestions();
		await setTimeout(() => {
			this.setState({ loading: false });
		}, 1500)
	}

	render() {
		return (
			<div>
				{ this.state.loading ? <Loader /> : <p /> }
				<Container style={{ marginTop: 10 }}>
					{this.state.questions.map((question, index) => <Question {...question} key={index} />)}
				</Container>
			</div>
		);
	}	
}
