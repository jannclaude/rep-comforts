import { Button, Container, Form, ListGroup, Modal, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { HiShoppingCart, HiMenu } from "react-icons/hi";
import { RiAccountBoxFill } from "react-icons/ri";
import React, { useContext, useState } from 'react';
import UserContext from '../UserContext';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';
import DropdownList from './DropdownList';
import Swal from 'sweetalert2';


export default function NavScroll() {
	const {user, setUser} = useContext(UserContext);
	console.log("This is user data: ", user);

	const [searchQuery, setSearchQuery] = useState('');
	const [searchResult, setSearchResult] = useState([]);
	const [showModal, setShowModal] = useState(false);	
	
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState('');

	const Toast = Swal.mixin({
		toast: true,
		position: "top-end",
		showConfirmButton: false,
		timer: 1500,
		didOpen: (toast) => {
		  toast.onmouseenter = Swal.stopTimer;
		  toast.onmouseleave = Swal.resumeTimer;
		}
	});

	const handleSearch = async () => {
		try {		

			if (searchQuery.trim() === '') {
				setSearchResult([]);
				return;
			}

			const response = await fetch(`${ process.env.REACT_APP_API_URL }/products/search`, {
				method: 'POST',
				headers: {
				'Content-Type': 'application/json',
				},
				body: JSON.stringify({ query: searchQuery }),
			});
			const data = await response.json();
			console.log("This is search data: ", data);

			
			if (Array.isArray(data)) {
				setSearchResult(data);
			}  else {
				setSearchResult([]);
			}

		} catch (error) {
			console.error('Error searching for products:', error);
			}
	};

	const handleResetPassword = async (e) => {
		e.preventDefault();
	
		if (password !== confirmPassword) {
		  setMessage('Passwords do not match');
		  return;
		}
	
		try {
			// Getting the token from localStorage
		  const token = localStorage.getItem('token'); // Replace with your actual JWT token
		  const response = await fetch(`${ process.env.REACT_APP_API_URL }/users/resetPassword`, {
			method: 'PUT',
			headers: {
			  'Content-Type': 'application/json',
			  Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ newPassword: password }),
		  });
	
		  if (response.ok) {
			setPassword('');
			setConfirmPassword('');
			Toast.fire({
				title: "Password updated succesfully",
				icon: "success",
			});
			handleCloseModal();
		  } else {
			Toast.fire({
				title: "Password failed to update",
				icon: "error",
			});
		  }
		} catch (error) {
		  setMessage('An error occurred. Please try again.');
		  console.error(error);
		}
	};

	console.log("This is user.id: ", user.id);
	const debouncedHandleSearch = debounce(handleSearch, 100);

	const handleInputChange = (e) => {
		const value = e.target.value;
		console.log("this is value: ", value)
		setSearchQuery(value);

		if (value.trim() === '') {
			setSearchResult([]);
			return;
		}

		debouncedHandleSearch();
	};

	const handleShowModal = () => setShowModal(true);
 	const handleCloseModal = () => setShowModal(false);

	return (
		<Navbar fixed="top" className="bg-transparent" expand="md">
			<Container fluid className="bg-transparent">
			<Navbar.Brand as={Link} to="/" exact className="bg-transparent"><img src="../logo192.png" height="90px" className="ps-3 bg-transparent" alt="logo"/></Navbar.Brand>
			<Navbar.Toggle aria-controls="navbarScroll" className="navbar-toggler"><HiMenu size={25} className="bg-transparent"/></Navbar.Toggle>
			<Navbar.Collapse className="bg-transparent" id="navbarScroll">
				<Nav className="ms-auto gap-2 my-2 my-lg-0 bg-transparent" style={{ maxHeight: '100px' }} navbarScroll>
					<Form className="position-relative">
						<Form.Control
							type="search"
							placeholder="Search Products"
							className="searchBar d-flex m-auto my-lg-0"
							aria-label="Search"
							value={searchQuery}
							onChange={handleInputChange} />
								<ListGroup className="position-absolute w-100 mt-1" style={{ zIndex: 1000 }}>
									{searchResult.map(product => (
										<DropdownList prodProp={product} key={product.id} />
									))}
								</ListGroup>
					</Form>
					<Button className="defaultButton" onClick={handleSearch}>Search</Button>

				</Nav>
				<Form className="d-flex ms-auto my-2 gap-3 pe-3 bg-transparent">
					<NavDropdown title=<RiAccountBoxFill size={25}/> id="navbarScrollingDropdown" align={{ md: 'end' }}>
					{user.id !== null ?
						user.isAdmin
						? 
						<>
							<NavDropdown.Item as={Link} to="/products" className="nav-dropdown-link" exact>Admin Dashboard</NavDropdown.Item>
							<NavDropdown.Item as={Link} onClick={handleShowModal} exact>Reset Password</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item as={Link} to="/logout" className="dropdown-logout">Log Out</NavDropdown.Item>
						</>
						 : 
						<>
							<NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
							<NavDropdown.Item as={Link} onClick={handleShowModal} exact>Reset Password</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item as={Link} to="/logout" className="dropdown-logout" exact>Log Out</NavDropdown.Item>
						</>
					 : 
						<>
						<NavDropdown.Item as={Link} to="/login" exact>Log In</NavDropdown.Item>
						<NavDropdown.Item as={Link} to="/register" exact>Sign Up</NavDropdown.Item>
						</>
					}
					</NavDropdown>
				</Form>
			</Navbar.Collapse>
			</Container>

			<Modal show={showModal} onHide={handleCloseModal}>
				<Modal.Header closeButton className="bg-blur">
					<Modal.Title>Reset Password</Modal.Title>
				</Modal.Header>
				<Modal.Body className="bg-light p-4">
					<div className="mb-3">
					<label htmlFor="password" className="form-label">
						New Password
					</label>
					<input
						type="password"
						className="form-control"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					</div>
					<div className="mb-3">
					<label htmlFor="confirmPassword" className="form-label">
						Confirm Password
					</label>
					<input
						type="password"
						className="form-control"
						id="confirmPassword"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
					</div>
					{message && <div className="alert alert-danger">{message}</div>}
				</Modal.Body>
				<Modal.Footer className="bg-light">
					<Button variant="secondary" onClick={handleCloseModal}>
					Close
					</Button>
					<Button className="defaultButton" onClick={handleResetPassword}>
					Reset Password
					</Button>
				</Modal.Footer>
			</Modal>

		</Navbar>




	);
}