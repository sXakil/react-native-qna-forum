import React, { Component } from 'react';
import { Card, Container, Button } from 'react-bootstrap';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import DeleteModal from './DeleteModal';
import Loader from './Loader';
import AnswerForm from './AnswerForm';
import AnswerList from './AnswerList';
export default class QuestionDetails extends Component {
	state = {
		qnTitle         : '',
		qnDescription   : '',
		qnCreated       : '',
		qnAnswers       : [],
		_id             : '',
		url             : 'http://localhost:3001/qn/' + this.props.match.params.qnId,
		showDeleteModal : false,
		loading         : true,
	};
	fetchQuestion = async () => {
		try {
			const data = await fetch(this.state.url);
			let question = await data.json();
			await this.setState({ ...question });
		} catch (e) {
			console.error(e);
		}
	};
	componentDidMount = async () => {
		try {
			await this.fetchQuestion();
			await setTimeout(() => {
				this.setState({ loading: false });
			}, 500);
		} catch (e) {
			console.error(e);
		}
	};

	handleDeleteThis = async () => {
		this.setState({ loading: true });
		try {
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
		} catch (e) {
			console.error(e);
		}
	};

	closeModal = () => {
		this.setState({ showDeleteModal: false });
	};
	showModal = () => {
		this.setState({ showDeleteModal: true });
	};
	onNewAnswerAdded = (newAnswer) => {
		this.setState((prevState) => ({ qnAnswers: [ ...prevState.qnAnswers, newAnswer ] }));
	};
	onAnswerDeleted = (deleteAnswerId) => {
		this.setState((prevState) => ({
			qnAnswers : prevState.qnAnswers.filter((answer) => answer._id !== deleteAnswerId),
		}));
	};

	render() {
		return (
			<>
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
								onClick={async () => await this.props.history.push('/question/' + this.state._id + '/edit')} //this.props.editThis()}
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
						what="Question"
						msg={this.state._id}
					/>
					<br />
					{this.state.qnAnswers.length > 0 ? (
						<h2 style={{ padding: 20 }}>{this.state.qnAnswers.length} Answers</h2>
					) : (
						<h2>No answer</h2>
					)}
					<AnswerList
						answers={this.state.qnAnswers}
						handleDeleteAnswer={this.onAnswerDeleted}
						parent={this.state._id}
						url={this.state.url}
					/>
					<AnswerForm handleNewAnswer={this.onNewAnswerAdded} url={this.state.url} />
				</Container>
			</>
		);
	}
}
