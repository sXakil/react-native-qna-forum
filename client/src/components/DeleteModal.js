import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteModal = (props) => {
	return (
        <Modal show={props.show} onHide={props.closeThis}>
			<Modal.Header closeButton>
				<Modal.Title>Delete Question</Modal.Title>
			</Modal.Header>
			<Modal.Body>{'Are you sure you want to delete this?\n' + props.msg}</Modal.Body>
			<Modal.Footer>
                <Button variant="secondary" onClick={props.closeThis}>
					Cancel
				</Button>
				<Button variant="danger" onClick={() => {
					props.deleteThis()
					props.closeThis()
				}}>
					Delete
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default DeleteModal

// 	< DeleteModal
// show = { this.state.showDeleteModal }
// closeThis = {() => this.closeModal()}
// deleteThis = {() => this.handleDeleteThis(question._id)}
// msg = { question._id }
// 	/>