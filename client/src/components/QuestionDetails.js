import React, { Component } from 'react';
import { Card, Container, Form, Button } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import Answer from './Answer';
import DeleteModal from './DeleteModal';
import Loader from './Loader';
export default class QuestionDetails extends Component {
	state = {
		qnTitle         : '',
		qnDescription   : '',
		qnCreated       : '',
		qnAnswers: [],
		_id: '',
		url             : 'http://localhost:3001/qn/' + this.props.match.params.qnId,
		showDeleteModal : false,
		loading         : true,
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
		await setTimeout(() => {
			this.setState({ loading: false });
		}, 500)
	};

	async postToDB(data) {
		this.setState({ loading: true });
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
		await this.setState({ loading: false });
		return response.json();
	}

	handleDeleteThis = async () => {
		this.setState({ loading: true });
		await fetch(this.state.url, {
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
		await this.setState({ loading: false });
		await this.props.history.push('/');
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
				<div>{this.state.loading ? <Loader /> : <p />}</div>
				<Container style={{ marginTop: 10 }}>
					<Card style={{ width: '100%', padding: 20, marginTop: 10, backgroundColor: 'rgba(0, 204, 0, 0.03)' }}>
						<Card.Body>
							<Card.Title>{this.state.qnTitle}</Card.Title>
							<Card.Subtitle className="mb-2 text-muted">{this.state.qnCreated}</Card.Subtitle>
							<Card.Text>{this.state.qnDescription}</Card.Text>
							<Button
								size="sm"
								variant="outline-primary"
								style={{ margin: 10, paddingInline: '0.25rem', paddingBlock: '0.5rem', maxWidth: 100 }}
								onClick={async () => await this.props.history.push('/edit/' + this.state._id)} //this.props.editThis()}
							>
								<FaRegEdit style={{ marginRight: 5 }} /> Edit
							</Button>
							<Button variant="outline-danger" size="sm" onClick={this.showModal}>
								<FaRegTrashAlt style={{ marginRight: 5 }} />Delete
							</Button>
						</Card.Body>
					</Card>
					<DeleteModal
						show={this.state.showDeleteModal}
						closeThis={() => this.closeModal()}
						deleteThis={() => this.handleDeleteThis()}
						msg={this.state._id}
					/>
					<br />
					{this.state.qnAnswers.length > 0 ? (
						<h2 style={{ padding: 20 }}>{this.state.qnAnswers.length} Answers</h2>
					) : (
						<h2>No answer</h2>
					)}
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
							await this.setState((prevState) => ({ ansBody: '', qnAnswers: [ ...prevState.qnAnswers, newAnswer ] }));
							await console.log(newAnswer);
						}}
					>
						Submit
					</Button>
				</Container>
			</Router>
		);
	}
}
