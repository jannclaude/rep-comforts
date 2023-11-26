import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Highlights() {
	return (
		<Row className="m-5">
			<Col xs={12} md={5} className="mb-4">
			<Card className="cardHighlight p-4">
				<Card.Body>
				<Card.Title>
					<h4>About Us</h4>
				</Card.Title>
				<Card.Text>
					Empower your interior design journey with our broad range of products, spanning from significant furniture pieces like beds and cabinets to delicate accessories such as table lamps and picture frames. We strive to meet all your design needs, offering a comprehensive selection that ensures each item contributes to the overall aesthetic of your home. Whether you're in search of substantial furnishings or smaller decorative elements, our collection provides diverse choices to match your distinct style. Explore our products to simplify and elevate the process of enhancing your living spaces.
				</Card.Text>
				</Card.Body>
			</Card>
			</Col>
			<Col xs={12} md={7} className="mb-4">
			<Card className="cardHighlight">
				<Card.Img variant="top" src="https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=1818&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
				<Card.Body className="p-4 d-flex flex-column">
					<Card.Title>
					<h4>Unparalleled quality, personalized service, and endless options </h4>
					</Card.Title>
					<Card.Text>
						Shop with us today and unlock the possibilities of a home that reflects your individual style. Explore more of our exquisite products and elevate your living experience with West Coast Comforts.
					</Card.Text>
					<Link className="btn defaultButton text-light mt-auto ms-auto" to={`/products/`}>Explore Products</Link>
				</Card.Body>
			</Card>
			</Col>
		</Row>
	)
}