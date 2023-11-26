import React from 'react';
import { Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'

export default function Product (props){

	const { breakPoint, data } = props

	const {_id, nameProduct, descriptionProduct, price, image } = data

	return(
		<Col xs={12} md={5} lg={3} className="mb-4">
			<Card className="productCard mx-2 ">
				<Card.Img variant="top" src={image} className="p-4"/>
				<Card.Body>
					<Card.Title className="text-center">
						<Link  className="text-decoration-none text-dark truncate-title" to={`/products/${_id}`}><strong>{nameProduct}</strong></Link>
					</Card.Title>
					<Card.Text className="truncate-text p-1">{ descriptionProduct }</Card.Text>
				</Card.Body>
				<Card.Footer className="d-flex p-3 align-items-center justify-content-between">
					<p className="text-center mb-0"><strong>{price.toLocaleString('en-US', { style: 'currency', currency: 'PHP' })}</strong></p>
					<Link className="btn btn-md defaultButton text-light" to={`/products/${_id}`}>View</Link>
				</Card.Footer>
			</Card>
		</Col>
	)
}