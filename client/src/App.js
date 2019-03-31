import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import QuestionList from './components/QuestionList';
import AskForm from './components/AskForm';
import QuestionDetails from './components/QuestionDetails';
import { FaHotjar } from 'react-icons/fa';

function App() {
	return (
		<Router>
			<Navbar bg="dark" variant="dark" expand="lg">
				<Navbar.Brand><FaHotjar size="1.5em"/></Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link as="div">
							<Link style={{ color: '#ddd', textDecorationColor: 'none' }} to="/">
								Questions
							</Link>
						</Nav.Link>
						<Nav.Link as="div">
							<Link style={{ color: '#ddd', textDecorationColor: 'none' }} to="/ask">
								Ask
							</Link>
						</Nav.Link>
					</Nav>
					<Form inline>
						<FormControl type="text" placeholder="Search" className="mr-sm-2" />
						<Button variant="outline-success">Search</Button>
					</Form>
				</Navbar.Collapse>
			</Navbar>
			<Route exact path="/" component={QuestionList} />
			<Route path="/ask" component={AskForm} />
			<Route path="/question/:qnId" component={QuestionDetails} />
			<div style={{paddingTop: 50}}/>
		</Router>
	);
}

export default App;
