import { Form, Button, Col, Row } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Login() {

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

	const { user, setUser } = useContext(UserContext);

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [isActive, setIsActive] = useState(false)

	function authenticate(e) {
		e.preventDefault();
		fetch(`${ process.env.REACT_APP_API_URL }/users/login`,{

		method: 'POST',
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			email: email,
			password: password
		})
	})
	.then(res => res.json())
	.then(data => {

		if(typeof data.access !== "undefined"){
			
			localStorage.setItem('token', data.access);
			// The "localStorage.setItem" allows us to manipulate the browser's localStorage property to store information indefinitely to help demonstrate conditional rendering and the login and logout features.
			retrieveUserDetails(data.access)
			// Because REact JS is a single page application, using the localStorage does not trigger rerendering of components and for us to be able to view the effects of this we would need to refresh out browser.

			// Set the global user state to have properties obtained from local storage
			// Though access to the user information can be done via the localStorage this is necessary to update the user state which will help update the App component and rerender it to avoid refreshing the page upon user login and logout
			// When states change components are rerendered and the AppNavbar component will be updated based on the user credentials, unlike when using the localStorage where the localStorage does not trigger component rerendering
			setUser({
				access: localStorage.getItem('token')
			})

			Toast.fire({
				title: "Login Succesful",
				icon: "success",
			});

		} else {

			Toast.fire({
				title: "Authentication failed",
				icon: "error",

			});

		}
	})

	setEmail('')
	setPassword('')

	}

	const retrieveUserDetails = (token) => {
		// The token will be sent as a part of the request's header information
		// We put "Bearer" in front to the token to follow implementation standards for JWTs
		fetch(`${ process.env.REACT_APP_API_URL }/users/userDetails`,{
			headers:{
				Authorization: `Bearer ${token}`
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);

			// Changes the global "user" state to store the "id" and the "isAdmin" property of the user which will be used for validation across the whole application
			setUser({
				id: data._id,
				isAdmin: data.isAdmin,
				firstName: data.firstName
			})
		})
	};

	useEffect(() => {
		if(email !== '' && password !== ''){
			setIsActive(true);
		} else {
			setIsActive(false);
		}
	}, [email,password]);



	return (
		user.id ?
			<Navigate to="/" />
		:
        <Row className="g-0">
			<Col className="loginWallpaper" sm={12} md={6}></Col>
			<Col className="loginBox ps-5" sm={12} md={6}>
				<Form className="pe-5" onSubmit ={(e) => authenticate(e)}>
					<h1 className="my-5 text-left"><strong>Log in to your West Coast Comforts account</strong></h1>
					<p>Get a more personalized experience where you don't need to fill in your information every time.</p>
					<Form.Group className="mt-4 mb-3" controlId="userEmail">
						<Form.Control
							type="email"
							placeholder="Enter email"
							value={email}
							className="w-50"
							onChange={(e) => setEmail(e.target.value)}
							required				
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="userPassword">
						<Form.Control
							type="password"
							placeholder="Enter Password"
							value={password}
							className="w-50"
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</Form.Group>
					{
						isActive
						? <Button className="defaultButton" type="submit" id="submitBtn">Log In</Button>
						: <Button className="defaultButton" type="submit" id="submitBtn" disabled>Log In</Button>
					}
					<p className="mt-5">Don't have an account?</p>
					<Link className="btn defaultButton text-light mb-5" to="/register">Sign Up</Link>
					<div className="paddingT"></div>
				</Form>
			</Col>
        </Row>
		
	)
}