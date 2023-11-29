import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function DropdownList({prodProp}) {

    const {_id, nameProduct, image} = prodProp;


    return(
        <ListGroup.Item as={Link} to={`/products/${_id}`} className="d-flex gap-2 list-group-item-action">
            <div>
                <img src={image} height="40px" className="rounded" />
            </div>
            <div>{nameProduct}</div>
        </ListGroup.Item>
    )
}

DropdownList.propTypes = {
    product: PropTypes.shape({
        nameProduct: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired
    })
}
