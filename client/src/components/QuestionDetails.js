import React, { Component } from 'react';
import { Card, Container, Form, Button } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import Answer from './Answer';
import DeleteModal from './DeleteModal'
export default class QuestionDetails extends Component {
	state = {
		qnTitle       : '',
		qnDescription : '',
		qnCreated     : '',
		qnAnswers     : [],
		url: 'http://localhost:3001/qn/' + this.props.match.params.qnId,
		showDeleteModal: false,
	};

	fetchQuestion = () => {
		fetch(this.state.url)
			.then((data) => data.json())
			.then((question) => {
				this.setState({ ...question });
			})
			.catch((e) => console.warn(e));
	};
	componentDidMount = async () => {
		await this.fetchQuestion();
	};

	async postToDB(data) {
		const response = await fetch(this.state.url, {
			method      : 'POST',
			mode        : 'cors',
			cache       : 'no-cache',
			credentials : 'same-origin',
			headers     : {
				'Content-Type' : 'application/json',
			},
			redirect    : 'follow',
			referrer    : 'no-referrer',
			body        : JSON.stringify(data),
		});
		return response.json();
	}

	handleDeleteThis = async (id) => {
		await fetch(this.state.url, {
			method: 'DELETE',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
			},
			redirect: 'follow',
			referrer: 'no-referrer',
		});
		await this.props.history.push('/')
	};

	closeModal = () => {
		this.setState({ showDeleteModal: false });
	};
	showModal = () => {
		this.setState({ showDeleteModal: true });
	};

	handleAnsBodyChange = (e) => {
		this.setState({ ansBody: e.target.value });
	};

	render() {
		return (
			<Router>
				<Container style={{ marginTop: 10 }}>
					<Card style={{ width: '100%', padding: 20, marginTop: 10, backgroundColor: 'rgba(0, 204, 0, 0.03)' }}>
						<Card.Body>
							<Card.Title>{this.state.qnTitle}</Card.Title>
							<Card.Subtitle className="mb-2 text-muted">{this.state.qnCreated}</Card.Subtitle>
							<Card.Text>{this.state.qnDescription}</Card.Text>
							<Button variant="danger" size="sm" onClick={this.showModal}>Delete</Button>
						</Card.Body>
					</Card>
					< DeleteModal
						show={this.state.showDeleteModal}
						closeThis={() => this.closeModal()}
						deleteThis={() => this.handleDeleteThis(this.state._id)}
						msg={this.state._id}
					/>
					<div>
						{this.state.qnAnswers.map((answer, index) => (
							<Answer ansBody={answer.ansBody} ansCreated={answer.ansCreated} key={index} />
						))}
					</div>
					<Form style={{ marginTop: 10 }} autoComplete="off">
						<Form.Group controlId="answerForm.AnswerBody">
							<Form.Label>Write an Answer</Form.Label>
							<Form.Control
								as="textarea"
								rows="7"
								value={this.state.ansBody}
								onChange={this.handleAnsBodyChange}
								placeholder="The answer goes here..."
							/>
						</Form.Group>
						<Form.Group controlId="answerForm.AnonymousAnswer">
							<Form.Check type="checkbox" label="Answer anonymously" />
						</Form.Group>
					</Form>
					<Button
						variant="primary"
						type="button"
						onClick={async () => {
							let newAnswer = await this.postToDB({ ansBody: this.state.ansBody });
							await this.setState(prevState => ({ ansBody: '', qnAnswers: [...prevState.qnAnswers, newAnswer] }));
							await console.log(newAnswer)
						}}
					>
						Submit
					</Button>
				</Container>
			</Router>
		);
	}
}
