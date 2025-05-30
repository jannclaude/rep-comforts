import { useState, useEffect, useContext } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';

export default function Register() {
	const {user} = useContext(UserContext);

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

	// State hooks to store the values of the input field
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("")
	const [email, setEmail] = useState("")
	const [mobileNo, setMobileNo] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
    const [shippingAddress, setShippingAddress] = useState("")
	
	// State to determine whether submit button is enabled or not
	const [isActive, setIsActive] = useState(false);

	// Check if values are succesfully binded
	console.log(firstName);
	console.log(lastName);
	console.log(email);
	console.log(mobileNo);
	console.log(password);
	console.log(confirmPassword);

	function registerUser(e) {

		// Prevents page redirection via form submission
		e.preventDefault();

		fetch(`${ process.env.REACT_APP_API_URL }/users/register`,{

		method: 'POST',
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({

			firstName: firstName,
			lastName: lastName,
			email: email,
			mobileNo: mobileNo,
			password: password,
			shippingAddress: shippingAddress,
			isUser: true

		})
		})
		.then(res => res.json())
		.then(data => {

		//data is the response of the api/server after it's been process as JS object through our res.json() method.
		console.log(data);
		//data will only contain an email property if we can properly save our user.
		if(data){

			// It is to clear input fields
			setFirstName('');
			setLastName('');
			setEmail('');
			setMobileNo('');
			setPassword('');
			setConfirmPassword('');
			setShippingAddress('');
			

			Toast.fire({
				title: "Sign up successful!",
				icon: "success",
			});

		} else {
			
			Toast.fire({
				title: "Sign up failed. Try again.",
				icon: "error",
			});
		}

		})
	}

	useEffect(() => {
		if((firstName !== "" && lastName !== "" && email !== "" && mobileNo !== "" && password !== "" && confirmPassword !== "" && shippingAddress !== "") && (password === confirmPassword) && (mobileNo.length === 11)){

			setIsActive(true)

		} else {

			setIsActive(false)
		}
	},[firstName, lastName, email, mobileNo, password, confirmPassword, shippingAddress])


	return (
		(user.id !== null) ?
		<Navigate to="/"/>
		:
		<Row className="g-0">
			<Col className="signupWallpaper" sm={12} md={6}></Col>
			<Col className="loginBox ps-5" sm={12} md={6}>
				<Form onSubmit= {(e) => registerUser(e)}>
				<h1 className="my-5 text-left"><strong>Sign up with us!</strong></h1>
				<p>Create your own cozy corner with West Coast Comforts. It's free!</p>
					<Form.Group className="mt-4 mb-3">
						<Form.Control 
						type="text" 
						placeholder="First Name" 
						required
						value={firstName}
						className="w-50"
						onChange={e => {setFirstName(e.target.value)}}
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Control 
						type="text" 
						placeholder="Last Name" 
						required
						value={lastName}
						className="w-50"
						onChange={e => {setLastName(e.target.value)}}
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Control 
						type="email" 
						placeholder="Email Address" 
						required
						value={email}
						className="w-50"
						onChange={e => {setEmail(e.target.value)}}
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Control 
						type="number" 
						placeholder="Phone No." 
						required
						value={mobileNo}
						className="w-50"
						onChange={e => {setMobileNo(e.target.value)}}
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Control 
						type="text" 
						placeholder="Shipping Address" 
						required
						value={shippingAddress}
						className="w-50"
						onChange={e => {setShippingAddress(e.target.value)}}
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Control 
						type="password" 
						placeholder="Password" 
						required
						value={password}
						className="w-50"
						onChange={e => {setPassword(e.target.value)}}
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Control 
						type="password" 
						placeholder="Confirm Password" 
						required
						value={confirmPassword}
						className="w-50"
						onChange={e => {setConfirmPassword(e.target.value)}}
						/>
					</Form.Group>
					{
						isActive
						? <Button className="defaultButton" type="submit">Sign Up</Button>
						: <Button className="defaultButton" disabled>Sign Up</Button>
					}
					<p className="mt-5">Already have an account?</p>
					<Link className="btn defaultButton text-light mb-5" to="/login">Log In</Link>
					<div className="paddingT"></div>
				</Form>
			</Col>
		</Row>
			
	)
}
