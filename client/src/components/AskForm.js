import React, { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import '../css/inputs.css';
export default class AskForm extends Component {
	state = {
		qnTitle       : '',
		qnDescription : '',
	};

	async postToDB(data) {
		const response = await fetch('http://localhost:3001/qn', {
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
		return console.log(response.json());
	}

	handleTitleChange = (e) => {
		this.setState({ qnTitle: e.target.value });
	};

	handleDescriptionChange = (e) => {
		this.setState({ qnDescription: e.target.value });
	};

	render() {
		return (
			<Router>
				<Container style={{ marginTop: 10 }}>
					<Form autoComplete="off">
						<Form.Group controlId="questionForm.QuestionTitle">
							<Form.Label>Question</Form.Label>
							<Form.Control
								type="text"
								placeholder="Title"
								value={this.state.qnTitle}
								onChange={this.handleTitleChange}
							/>
						</Form.Group>
						<Form.Group controlId="questionForm.QuestionDescription">
							<Form.Label>Description</Form.Label>
							<Form.Control
								as="textarea"
								rows="7"
								value={this.state.qnDescription}
								onChange={this.handleDescriptionChange}
								placeholder="Description"
							/>
						</Form.Group>
						<Form.Group controlId="questionForm.AnonymousQuestion">
							<Form.Check type="checkbox" label="Ask Anonymously" />
						</Form.Group>
					</Form>
					<Button
						variant="primary"
						type="button"
						onClick={async () => {
							await this.postToDB({ ...this.state });
							await this.props.history.push('/');
						}}
					>
						Submit
					</Button>
				</Container>
			</Router>
		);
	}
}
