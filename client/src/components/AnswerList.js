import React, { Component } from 'react';
import Answer from './Answer';

export default class AnswerList extends Component {
	render() {
		return (
			<div>
				<div>
					{this.props.answers.map((answer, index) => (
						<Answer
							{...answer}
							url={this.props.url}
							parent={this.props.parent}
							deleteThis={this.props.handleDeleteAnswer}
							key={index}
						/>
					))}
				</div>
			</div>
		);
	}
}
