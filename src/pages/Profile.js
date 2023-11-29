import {useState,useEffect, useContext} from 'react';
import {Row, Col, Badge, Button, Modal, Form, FloatingLabel} from 'react-bootstrap';
import UserContext from '../UserContext';
import { Navigate } from 'react-router-dom';
import { HiMail, HiPhone, HiLocationMarker, HiShoppingCart, HiCalendar } from "react-icons/hi";
import { LuPackage } from "react-icons/lu";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { Card, ListGroup } from 'react-bootstrap';
import CartItem from '../components/CartItem';
import Swal from 'sweetalert2';

export default function Profile(){

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

    const [details, setDetails] = useState({ cartArray: [], orderArray: [] });
	const [showModal, setShowModal] = useState(false);
	const [paymentDetails, setPaymentDetails] = useState({
		paymentMethod: '',
		cardNumber: '',
		cardholderName: '',
		expMonth: '',
		expYear: '',
		cvv: '',
	});

    useEffect(()=>{
        fetch(`${ process.env.REACT_APP_API_URL }/users/userDetails`, {
			headers: {
				Authorization: `Bearer ${ localStorage.getItem('token') }`
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log("this is profile data", data)
			// Set the user states values with the user details upon successful login.
			if (typeof data === 'object' && Array.isArray(data.cartArray) && Array.isArray(data.orderArray)) {
				setDetails(data);
			}
        });

    },[])

	const handleDelete = (cartId) => {
		// Make a DELETE request to the backend to remove the product from the cart
		fetch(`${ process.env.REACT_APP_API_URL }/users/removeToCart/${cartId}`, {
		  method: 'DELETE',
		  headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		  },
		})
		  .then((res) => res.json())
		  .then((data) => {
			// Update the state to reflect the changes
			if (data.message === 'You have successfully removed the item from your cart!') {
			  setDetails((prevDetails) => ({
				...prevDetails,
				cartArray: prevDetails.cartArray.filter((cartItem) => cartItem._id !== cartId),
			  }));
			  console.log('Item deleted successfully');
			} else {
			  console.error('Error deleting item:', data.message);
			}
		  })
		  .catch((error) => {
			console.error('Error deleting item:', error.message);
		  });
	};

	const handleOrderNow = () => {
		setShowModal(true);
	};
	
	const handleModalClose = () => {
		setShowModal(false);
	};

	const handlePaymentDetailsChange = (e) => {
		const { name, value } = e.target;
		setPaymentDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
	};

	const isFormValid = () => {
		const isValidPaymentMethod = paymentDetails.paymentMethod.trim() !== '';
		const isValidCardNumber = /^\d{16}$/.test(paymentDetails.cardNumber);
		const isValidCardholderName = paymentDetails.cardholderName.trim() !== '';
		const isValidExpMonth = /^\d{2}$/.test(paymentDetails.expMonth);
		const isValidExpYear = /^\d{2}$/.test(paymentDetails.expYear);
		const isValidCvv = /^\d{3}$/.test(paymentDetails.cvv);
	
		return isValidPaymentMethod && isValidCardNumber && isValidCardholderName && isValidExpMonth && isValidExpYear && isValidCvv;
	};

	
	const handleOrderSubmit = async () => {
	try {
		const response = await fetch(`${ process.env.REACT_APP_API_URL }/users/checkout`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${ localStorage.getItem('token')}` // Replace with your actual JWT token
		},
		body: JSON.stringify({
			...paymentDetails,
			paymentStatus: 'Paid',
			orderStatus: 'Shipped',
		}),
		});

		if (response.ok) {
		const userDetailsResponse = await fetch(`${ process.env.REACT_APP_API_URL }/users/userDetails`, {
			headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		});

		if (userDetailsResponse.ok) {
			Toast.fire({
				title: "Order was successfully made!",
				icon: "success",
			});
			const updatedUserDetails = await userDetailsResponse.json();
			setDetails(updatedUserDetails);
		} else {
			Toast.fire({
				title: "Order failed!",
				icon: "error",
			});
			console.error('Error fetching updated user details after placing the order');
		}
		} else {
		
		}
	} catch (error) {
		console.error('An error occurred while placing the order:', error);
		// Handle error, maybe show an error message to the user
	} finally {
		setShowModal(false);
	}
	};


	const updateProductQuantity = async (productId, action) => {
		try {
		const endpoint = action === 'increment' ? 'incrementQuantities' : 'decrementQuantities';
		const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${endpoint}`, {
			method: 'PUT',
			headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
			body: JSON.stringify({ productId }),
		});
	
		if (response.ok) {
			// Fetch updated user details after updating quantities
			const userDetailsResponse = await fetch(`${process.env.REACT_APP_API_URL}/users/userDetails`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
			});
	
			if (userDetailsResponse.ok) {
			const updatedUserDetails = await userDetailsResponse.json();
			setDetails(updatedUserDetails);
			} else {
			console.error('Error fetching updated user details after updating quantities');
			}
		} else {
			console.error(`Error ${action === 'increment' ? 'incrementing' : 'decrementing'} quantity: `, response.statusText);
		}
		} catch (error) {
		console.error(`An error occurred while ${action === 'increment' ? 'incrementing' : 'decrementing'} quantity: `, error);
		}
	};
	
	// Add this function to handle incrementing the quantity
	const handleIncrementQuantity = (productId) => {
		updateProductQuantity(productId, 'increment');
	};
	
	// Add this function to handle decrementing the quantity
	const handleDecrementQuantity = (productId) => {
		updateProductQuantity(productId, 'decrement');
	};

	const formatDate = (dateString) => {
		const dateObject = new Date(dateString);

		return dateObject.toLocaleString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			hour12: true,
		})
	}

	const calculateTotalSum = () => {
		return details.cartArray.reduce((sum, cartItem) => {
		  return sum + cartItem.prodInfo.reduce((itemSum, prodInfo) => {
			return itemSum + prodInfo.totalPrice;
		  }, 0);
		}, 0);
	  };


	return (
        (user.id === null) ?
        <Navigate to="/" />
        :
		<>
			<Row className="g-0">
				<Col className="profileHeader bg-light text-dark">
					<div className="profilePadding">
						<div className="d-flex">
							<img className="rounded-circle" width={150} src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
							<h2 className="mt-3 ms-3 align-self-center"><strong>{`${details.firstName} ${details.lastName}`}</strong></h2>
						</div>
						<hr />
						<div className="d-flex row">
							<div className="col-sm-12 col-md-4">
								<h4>Contacts</h4>
								<ul className="list-unstyled">
									<li className="ms-4 pb-1"><HiMail size={20} /> {details.email}</li>
									<li className="ms-4 pb-1"><HiPhone size={20} /> {details.mobileNo}</li>
									<li className="ms-4 pb-1"><HiLocationMarker size={20} /> {details.shippingAddress}</li>
								</ul>
							</div>
							<div className="col-sm-12 col-md-8">
								<h4>Cart Items</h4>
								<Card>
									<ListGroup variant="flush">
										{details.cartArray.map((cartItem) => (
										<CartItem key={cartItem._id} cartItem={cartItem} onDelete={handleDelete} onIncrement={handleIncrementQuantity} onDecrement={handleDecrementQuantity} />
										))}
									</ListGroup>
									<Card.Footer >
										<Button className="ms-2 my-2 float-end border-success bg-success" disabled={details.cartArray.length === 0} onClick={handleOrderNow}>
											Order Now
										</Button>
										<Card.Text className="mt-3">
											<strong>Total:</strong> {calculateTotalSum().toLocaleString('en-US', { style: 'currency', currency: 'PHP' })}
										</Card.Text>
									</Card.Footer>
								</Card>
							</div>
						</div>
						<div>
							
							<h4 className="mt-5">Orders History</h4>
								{details.orderArray.length === 0 ? (
									<p>No orders yet.</p>
								) : (
									<ListGroup>
									{details.orderArray.map((order) => (
										<ListGroup.Item key={order._id.$oid} className="p-4">
											<h6>
												<HiShoppingCart size={18} /> <strong>Order ID:</strong> {order._id}
												<p><HiCalendar size={18} /> Ordered on {formatDate(order.addedOn)}</p>
											</h6>

											<ul className="list-unstyled">
												<li>
													<span><LuPackage size={18} /> <strong>Products:</strong></span>
													<ul className="list-unstyled ms-3">
													{order.nameProduct.map((productName, index) => (
													<li className="d-flex align-items-center justify-content-start" key={index}>
														<span className="ms-1">
															{productName}
														
														<Badge className="ms-1 align-middle" bg="primary" pill>
														{order.cartQuantity[index]} {order.cartQuantity[index] > 1 ? 'items' : 'item'}
														</Badge>
														</span>
													</li>
													))}
													</ul>
												</li>
											</ul>
											<h6><FaMoneyBill1Wave size={18} /> <strong>Total:</strong> {order.totalPrice.toLocaleString('en-US', { style: 'currency', currency: 'PHP' })}</h6>
											<span className="float-end">
												<Badge bg="success" pill>
													{order.paymentStatus}
												</Badge>
												<Badge className="ms-1" bg="success" pill>
													{order.orderStatus}
												</Badge>
											</span>
										</ListGroup.Item>
									))}
									</ListGroup>
								)}
							
						</div>
					</div>
				</Col>
			</Row>

			<Modal show={showModal} onHide={handleModalClose}>
				<Modal.Header closeButton className="bg-blur">
				<Modal.Title>Card Details</Modal.Title>
				</Modal.Header>
				<Modal.Body className="bg-light">
				<Form className="p-3">
					{/* Add form fields for payment details */}
					{/* Example: */}
					<Form.Group className="pb-3" controlId="paymentMethod">
						<Form.Select
							name="paymentMethod"
							value={paymentDetails.paymentMethod}
							onChange={handlePaymentDetailsChange}
							required>
							<option value="" disabled>Select Payment Method</option>
							<option value="Visa">Visa</option>
							<option value="Mastercard">Mastercard</option>
							<option value="American Express">American Express</option>
						</Form.Select>
					</Form.Group>
					{/* Repeat for other payment details fields */}
					{/* Example: */}
					<Form.Group className="pb-3" controlId="cardNumber">
						<FloatingLabel label="Enter 16 digit card no.">
							<Form.Control
							type="number"
							name="cardNumber"
							placeholder="Enter 16 digit card no."
							value={paymentDetails.cardNumber}
							onChange={handlePaymentDetailsChange}
							required />
						</FloatingLabel>
					</Form.Group>
					{/* Repeat for other payment details fields */}
					{/* Example: */}
					<Form.Group className="pb-3" controlId="cardholderName">
						<FloatingLabel label="Enter cardholder name">
							<Form.Control
								type="text"
								name="cardholderName"
								placeholder="Enter cardholder name"
								value={paymentDetails.cardholderName}
								onChange={handlePaymentDetailsChange}
								required />
						</FloatingLabel>
						</Form.Group>
					{/* Repeat for other payment details fields */}
					<div className="gap-3 d-flex">
						<Form.Group controlId="expMonth">
							<FloatingLabel label="MM">
								<Form.Control
									type="number"
									name="expMonth"
									placeholder="MM"
									value={paymentDetails.expMonth}
									onChange={handlePaymentDetailsChange}
									required />
							</FloatingLabel>
						</Form.Group>
						{/* Repeat for other payment details fields */}
						{/* Example: */}
						<Form.Group controlId="expYear">
						<FloatingLabel label="YY">
							<Form.Control
								type="number"
								name="expYear"
								placeholder="YY"
								value={paymentDetails.expYear}
								onChange={handlePaymentDetailsChange}
								required />
						</FloatingLabel>
						</Form.Group>
						{/* Repeat for other payment details fields */}
						{/* Example: */}
						<Form.Group controlId="cvv">
							<FloatingLabel label="CVV">
								<Form.Control
									type="number"
									name="cvv"
									placeholder="CVV"
									value={paymentDetails.cvv}
									onChange={handlePaymentDetailsChange}
									required />
							</FloatingLabel>
						</Form.Group>
					</div>
					{/* Example: */}
					{/* Repeat for other payment details fields */}
				</Form>
				</Modal.Body>
				<Modal.Footer className="bg-light">
				<Button variant="secondary" onClick={handleModalClose}>
					Close
				</Button>
				<Button className="defaultButton" disabled={!isFormValid()} onClick={handleOrderSubmit}>
					Submit Order
				</Button>
				</Modal.Footer>
			</Modal>

		</>


	)

}