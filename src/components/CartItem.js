import React from 'react';
import { Card, ListGroup, Badge, Button } from 'react-bootstrap';
import { FaPlus, FaMinus } from "react-icons/fa";

const CartItem = ({ cartItem, onDelete, onIncrement, onDecrement }) => {

	return (
		<ListGroup.Item key={cartItem._id}>
			{cartItem.prodInfo.map((prodItem) => (
			<div key={prodItem.productId} className="d-flex">
				<div>
					<img className="mt-4" src={prodItem.image} height={'70px'} alt={prodItem.nameProduct} />
				</div>
				<div className="w-100">
					<Button className="ms-2 mt-3 float-end rounded-pill text-size border-danger bg-danger" onClick={() => onDelete(cartItem._id)}>
					Delete
					</Button>
					<Card.Title className="mt-4 ms-4">
					<strong>{prodItem.nameProduct}</strong>
					</Card.Title>
					<Button className="ms-4 btn-sm bg-transparent border-0 rounded-circle" onClick={() => onDecrement(prodItem.productId)}>
					<FaMinus size={11} className="text-primary" />
					</Button>
					<Badge className="ms-1 p-2" bg="primary" pill>
					{prodItem.cartQuantity > 1 ?
						<span>{prodItem.cartQuantity} items</span>
						:
						<span>{prodItem.cartQuantity} item</span>
					}
					</Badge>
					<Button className="ms-1 btn-sm bg-transparent border-0 rounded-circle" pill onClick={() => onIncrement(prodItem.productId)}>
					<FaPlus size={11} className="text-primary" />
					</Button>
					<Card.Text className="float-end mt-3">
					{prodItem.price.toLocaleString('en-US', { style: 'currency', currency: 'PHP' })}
					</Card.Text>
				</div>
			</div>
			))}
		</ListGroup.Item>
		


	);
};

export default CartItem;
