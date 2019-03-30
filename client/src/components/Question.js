import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
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
								{this.props.qnCreated.slice(0, 10)}
							</Card.Subtitle>
							<Card.Text>{this.props.qnDescription}</Card.Text>
						</Card.Body>
					</Link>
				</Card>
			</Container>
		);
	}
}

// {/* <Button
//   size="sm"
//   variant="outline-primary"
//   style={{ marginRight: 10 }}
//   onClick={() => props.editThis()}
// >
//   Edit
// 				</Button> */}
