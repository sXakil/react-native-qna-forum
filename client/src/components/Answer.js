import React, { Component } from 'react';
import { Card, Container } from 'react-bootstrap';
export default class Answer extends Component {
	render() {
		return (
			<Container style={{ marginTop: 10 }}>
				<Card style={{ width: '100%', marginTop: 10 }}>
					<Card.Body>
						<Card.Text>{this.props.ansBody}</Card.Text>
						<Card.Subtitle className="mb-2 text-muted">{this.props.ansCreated.slice(0, 10)}</Card.Subtitle>
					</Card.Body>
				</Card>
			</Container>
		);
	}
}
