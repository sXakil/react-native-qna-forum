import React, { Component } from 'react';
import { Card, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import DeleteModal from './DeleteModal';
export default class Answer extends Component {
	state = {
		showDeleteAnswerModal : false,
		url                   : this.props.url + '/ans/' + this.props._id,
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
			await this.props.deleteThis(this.props._id);
		} catch (e) {
			console.error(e);
		}
	};

	closeModal = () => {
		this.setState({ showDeleteAnswerModal: false });
	};
	showModal = () => {
		this.setState({ showDeleteAnswerModal: true });
	};

	render() {
		return (
			<Container style={{ marginTop: 10 }}>
				<DeleteModal
					show={this.state.showDeleteAnswerModal}
					closeThis={() => this.closeModal()}
					deleteThis={() => this.handleDeleteThis()}
					what={'Answer'}
					msg={this.props._id}
				/>
				<Card style={{ width: '100%', marginTop: 10 }}>
					<Card.Body>
						<Card.Text>{this.props.ansBody}</Card.Text>
						<Card.Subtitle className="mb-2 text-muted">{this.props.ansCreated.slice(0, 10)}</Card.Subtitle>
					</Card.Body>
					<div style={{ flexDirection: 'row' }}>
						<Link to={this.props.parent + '/ans/' + this.props._id + '/edit'}>
							<Button variant={'outline-primary'} size="sm" style={{ maxWidth: 40, margin: 10 }}>
								<FaRegEdit />
							</Button>
						</Link>
						<Button
							variant={'outline-danger'}
							size="sm"
							style={{ maxWidth: 40, margin: 10 }}
							onClick={() => this.setState({ showDeleteAnswerModal: true })}
						>
							<FaRegTrashAlt />
						</Button>
					</div>
				</Card>
			</Container>
		);
	}
}
