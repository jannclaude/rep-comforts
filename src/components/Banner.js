import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Banner({data}) {
	const { title, content, destination, label} = data;
	return (
		<Row className="gx-0">
			<Col className="pt-5 pb-5 text-center">
				<h1 className="px-3">{title}</h1>
				<p className="px-3">{content}</p>
				<Link className="btn defaultButton text-light" to={destination}>{label}</Link>
			</Col>
		</Row>
	)
}
