import React, { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import Loader from './Loader';
import '../css/inputs.css';
export default class EditForm extends Component {
	state = {
		ansBody       : '',
		_id           : '',
		url           : `http://localhost:3001/qn/${this.props.match.params.qnId}/ans/${this.props.match.params.ansId}`,
		loading       : true,
	};

	fetchAnswer = () => {
		fetch(this.state.url)
			.then((data) => data.json())
			.then((answer) => {
        this.setState({ ...answer });
			})
			.catch((e) => console.warn(e));
	};

	async componentDidMount() {
		try {
      await this.fetchAnswer();
			await setTimeout(() => {
				this.setState({ loading: false });
			}, 500);
		} catch (e) {
			console.error(e);
		}
	}

	async putToDB(data) {
		try {
			await fetch(this.state.url, {
				method      : 'PUT',
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
		} catch (e) {
			console.error(e);
		}
	}

  handleAnswerChange = (e) => {
		this.setState({ ansBody: e.target.value });
	};

	render() {
		return (
			<Router>
				<div>{this.state.loading ? <Loader /> : <p />}</div>
				<Container style={{ paddingTop: 10 }}>
					<Form autoComplete="off">
						<Form.Group controlId="answerForm.AnswerBody">
							<Form.Label>Answer</Form.Label>
							<Form.Control
								as="textarea"
								rows="7"
                value={this.state.ansBody}
								onChange={this.handleAnswerChange}
								placeholder="Description"
							/>
						</Form.Group>
					</Form>
					<Button
						variant="primary"
						type="button"
						onClick={async () => {
							await this.putToDB({ ansBody: this.state.ansBody });
              await this.props.history.push('/question/' + this.props.match.params.qnId);
						}}
					>
						Submit
					</Button>
				</Container>
			</Router>
		);
	}
}
