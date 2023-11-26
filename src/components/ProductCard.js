import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import PropTypes from 'prop-types';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';

export default function ProductCard({prodProp}) {

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

	const {_id, nameProduct, descriptionProduct, price, image, isActive} = prodProp;

	const addToCart = (_id) => {
		fetch(`${ process.env.REACT_APP_API_URL }/users/addToCart/${_id}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${ localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				_id: _id
			})
		})
		.then(res => res.json())
		.then(data =>{
			console.log(data);

			if (data.message === 'You have successfully added the item to your cart!') {
				Toast.fire({
					title: "Product added to cart.",
					icon: "success",
				});
			} else {
				Toast.fire({
					title: "Can't add product to cart. Please log in to add an item to cart.",
					icon: "error",
				});
				console.log("Error")
			}
		});
	};

	return (
		<Card className="productCard">
			<Card.Img variant="top" src={image} />
			<Card.Body>
				<Card.Title>
					<Link  className="text-decoration-none text-dark truncate-title" to={`/products/${_id}`}><strong>{nameProduct}</strong></Link>
				</Card.Title>
				<Card.Text className="truncate-text">{descriptionProduct}</Card.Text>
			</Card.Body>
			<Card.Footer className="d-flex p-3 align-items-center justify-content-between">
					<p className="text-center mb-0"><strong>{price.toLocaleString('en-US', { style: 'currency', currency: 'PHP' })}</strong></p>
					{isActive ? (

						user.isAdmin ?
						null
						:
						<Link className="btn btn-md defaultButton text-light" block onClick={() => addToCart(_id)}>
						Add To Cart
						</Link>
					) : (
						<Link className="btn btn-md defaultButton text-light" style={{ pointerEvents: 'none', opacity: 0.5}} block>
						Out of Stock
						</Link>
					)}
			</Card.Footer>
		</Card>
	)
}

ProductCard.propTypes = {
	product: PropTypes.shape({
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired
	})
}
