import React, { Component } from 'react';
import { Card, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
export default class Question extends Component {
	render() {
		return (
			<Container style={{ marginTop: 10 }}>
				<Card style={{ width: '100%', marginTop: 10 }}>
					<Link style={{ textDecoration: 'none', color: '#292929' }} to={'/question/' + this.props._id}>
						<Card.Body>
							<Card.Title>{this.props.qnTitle}</Card.Title>
							<Card.Subtitle className="mb-2 text-muted">
								{this.props.qnCreated.slice(0, 10) + ' | ' + this.props.qnAnswers.length + ' answers.'}
							</Card.Subtitle>
							<Card.Text>{this.props.qnDescription}</Card.Text>
						</Card.Body>
					</Link>
					<Button
						size="sm"
						variant="outline-primary"
						style={{ marginRight: 10, paddingInline: '0.25rem', paddingBlock: '0.5rem' }}
						onClick={() => alert('hi')} //this.props.editThis()}
					>
						Edit
				</Button>
				</Card>
			</Container>
		);
	}
}

