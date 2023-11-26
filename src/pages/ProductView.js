import { useState, useEffect, useContext } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';

export default function ProductView() {

	const { user } = useContext(UserContext);

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

	// The "useParams" hook allows us to retrieve the courseId passed via the URL
	const { productId } = useParams();

	const [nameProduct, setNameProduct] = useState("");
	const [descriptionProduct, setDescriptionProduct] = useState("");
	const [price, setPrice] = useState(0);
	const [category, setCategory] = useState("");
	const [brand, setBrand] = useState("");
	const [image, setImage] = useState("");
	const [isActive, setIsActive] = useState("");

	const addToCart = (productId) => {
		fetch(`${ process.env.REACT_APP_API_URL }/users/addToCart/${productId}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${ localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				productId: productId
			})
		})
		.then(res => res.json())
		.then(data =>{
			console.log(data);

			if (data.message === 'You have successfully added the item to your cart!')
			{
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

	useEffect(() => {
		fetch(`${ process.env.REACT_APP_API_URL }/products/${productId}`)
		.then(res => res.json())
		.then(data  =>{
			console.log("This is get data: ", data);
			console.log("This is ID: ", data._id)

			setNameProduct(data.nameProduct);
			setDescriptionProduct(data.descriptionProduct);
			setPrice(data.price);
			setCategory(data.category);
			setBrand(data.brand);
			setImage(data.image);
			setIsActive(data.isActive);
		})

	}, [productId]);

	return(
		<>
		<div className="headerPhoto"></div>
		<Container className="mt-4 mb-5">
			<Row>
				<Col md={12} lg={5} className="d-flex justify-content-center">
					<img src={image} className="imageProduct border" />
				</Col>
				<Col md={12} lg={7}>
					<div className="contentProduct">
						<h4><strong>{nameProduct}</strong></h4>
						<h5 className="text-secondary">{brand}</h5>
						<h6 className="text-secondary">{category}</h6>
						<h5 className="text-dark mb-5">{price.toLocaleString('en-US', { style: 'currency', currency: 'PHP' })}</h5>
						<p className="mb-4" style={{ whiteSpace: 'pre-line' }}>{descriptionProduct}</p>
						
						{isActive ? (
							user.isAdmin ?
							null
							:
							<Button className="btn defaultButton text-light" block onClick={() => addToCart(productId)}>Add to Cart</Button>
						) : (
							<Button className="btn defaultButton text-light" block disabled>Out of Stock</Button>
						)}
					</div>
				</Col>
			</Row>
		</Container>
		</>
		
	)
}