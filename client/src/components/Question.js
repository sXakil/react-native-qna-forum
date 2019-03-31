import React, { Component } from 'react';
import { Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MdChatBubble, MdDateRange } from 'react-icons/md'
export default class Question extends Component {
	render() {
		return (
			<Container style={{ marginTop: 10 }}>
				<Card style={{ width: '100%', marginTop: 10 }}>
					<Link style={{ textDecoration: 'none', color: '#292929' }} to={'/question/' + this.props._id}>
						<Card.Body>
							<Card.Title>{this.props.qnTitle}</Card.Title>
							<Card.Subtitle className="mb-2 text-muted">
								<MdDateRange/>{' ' + this.props.qnCreated.slice(0, 10)} <span style={{paddingRight: 10}} /> < MdChatBubble/> {this.props.qnAnswers.length + ' answers.'}
							</Card.Subtitle>
							<Card.Text>{this.props.qnDescription}</Card.Text>
						</Card.Body>
					</Link>
				</Card>
			</Container>
		);
	}
}
