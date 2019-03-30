import React, { Component } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
export default class QuestionList extends Component {
	state = {
		questions : [],
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
	componentDidMount() {
		this.fetchQuestions();
	}
	render() {
		return (
			<Container style={{ marginTop: 10 }}>
				{this.state.questions.map((question, index) => (
					<Question {...question} key={index} deleteThis={() => this.handleDeleteThis(question._id)} />
				))}
			</Container>
		);
	}
}
const Question = (props) => {
	return (
		<Card style={{ width: '100%', marginTop: 10 }}>
			<Card.Body>
				<Card.Title>{props.qnTitle}</Card.Title>
				<Card.Subtitle className="mb-2 text-muted">{props.qnCreated.slice(0, 10)}</Card.Subtitle>
				<Card.Text>{props.qnDescription}</Card.Text>
				<Button variant="danger" onClick={() => props.deleteThis()}>
					Delete
				</Button>
			</Card.Body>
		</Card>
	);
};
