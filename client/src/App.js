import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import QuestionList from './components/QuestionList';
import AskForm from './components/AskForm';
import QuestionDetails from './components/QuestionDetails';
import EditQuestionForm from './components/EditQuestionForm';
import EditAnswerForm from './components/EditAnswerForm';
import FourOhFour from './components/FourOhFour';
import { FaHotjar } from 'react-icons/fa';

function App() {
	return (
		<Router>
			<Navbar bg="dark" variant="dark" expand="lg">
				<Navbar.Brand>
					<FaHotjar size="1.5em" />
				</Navbar.Brand>
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
						<Button variant="outline-light">Search</Button>
					</Form>
				</Navbar.Collapse>
			</Navbar>
			<Switch>
				<Route exact path="/" component={QuestionList} />
				<Route path="/ask" component={AskForm} />
				<Route path="/question/:qnId/ans/:ansId/edit" component={EditAnswerForm} />
				<Route exact path="/question/:qnId" component={QuestionDetails} />
				<Route path="/question/:qnId/edit" component={EditQuestionForm} />
				<Route component={FourOhFour} />
			</Switch>
			<div style={{ minHeight: 20 }} />
		</Router>
	);
}

export default App;
