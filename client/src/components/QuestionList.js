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
	handleDeleteThis = async (id) => {
		await fetch('http://localhost:3001/qn/' + id, {
			method      : 'DELETE',
			mode        : 'cors',
			cache       : 'no-cache',
			credentials : 'same-origin',
			headers     : {
				'Content-Type' : 'application/json',
			},
			redirect    : 'follow',
			referrer    : 'no-referrer',
		});
		this.setState((prevState) => ({
			questions : prevState.questions.filter((question) => question._id !== id),
		}));
	};
	handleEditThis = async (id) => {};
	closeModal = () => {
		this.setState({ showDeleteModal: false });
	};
	showModal = () => {
		this.setState({ showDeleteModal: true });
	};
	componentDidMount() {
		this.fetchQuestions();
  }
  
	render() {
		return (
			<Container style={{ marginTop: 10 }}>
				{this.state.questions.map((question, index) => (
						<Question
							{...question}
							key={index}
						/>
				))}
			</Container>
		);
	}
}
