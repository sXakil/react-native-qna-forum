import React, { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

export default class AnswerForm extends Component {
	state = {
		ansBody : '',
	};
	handleAnsBodyChange = (e) => {
		this.setState({ ansBody: e.target.value });
	};
	async postToDB(data) {
		this.setState({ loading: true });
		try {
			const response = await fetch(this.props.url, {
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
		} catch (e) {
			console.error(e);
		}
	}
	render() {
		return (
			<div>
				<Container>
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
							await this.props.handleNewAnswer(newAnswer);
							await this.setState({ ansBody: '' });
							await console.log(newAnswer);
						}}
					>
						Submit
					</Button>
				</Container>
			</div>
		);
	}
}
