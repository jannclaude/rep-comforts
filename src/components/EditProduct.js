import { Button, Modal, Form } from 'react-bootstrap';
import { useState } from 'react';
import Swal from 'sweetalert2';

export default function EditProduct({ product, fetchData }) {
	
	//state for courseId for the fetch URL 
	const [productId, setProductId] = useState("");

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

	// Forms state
	// Add state for the forms of course
	const [nameProduct, setNameProduct] = useState("");
	const [descriptionProduct, setDescriptionProduct] = useState("");
	const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
	const [brand, setBrand] = useState("");
	const [prodStock, setProdStock] = useState("");
	const [image, setImage] = useState("");
	

	// state for editCourse Modals to open/close
	const [showEdit, setShowEdit] = useState(false);

	const editProduct = (e, productId) => {
		e.preventDefault();

		fetch(`${ process.env.REACT_APP_API_URL }/products/${ productId }`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				nameProduct: nameProduct,
				descriptionProduct: descriptionProduct,
				price: price,
                category: category,
                brand: brand,
                prodStock: prodStock,
                image: image
			})
		})
		.then (res => res.json())
		.then (data => {
			console.log(data)

			if(data.message === "Product updated successfully."){
				Toast.fire({
                    title: "Successfully updated product",
                    icon: "success",
                });
				closeEdit();
				fetchData();
			} else {
				Toast.fire({
                    title: "Failed to update product",
                    icon: "error",
                });
				closeEdit();
				fetchData();
			}
		})
		}

	// function for opening the modal
	const openEdit = (courseId) => {
		fetch(`${ process.env.REACT_APP_API_URL }/products/${ courseId }`)
		.then(res => res.json())
		.then(data => {
			setProductId(data._id);
			setNameProduct(data.nameProduct);
			setDescriptionProduct(data.descriptionProduct);
			setPrice(data.price);
            setCategory(data.category);
            setBrand(data.brand);
            setProdStock(data.prodStock);
            setImage(data.image);
		})

		setShowEdit(true);
	}

	const closeEdit = () => {
		setShowEdit(false);
		setNameProduct('')
		setDescriptionProduct('')
		setPrice(0)
        setCategory('')
        setBrand('')
        setProdStock('')
        setImage('')
	}





	return(
	<>
		<Button variant="primary" size="sm" onClick={() => openEdit(product)}>Edit</Button>
		<Modal show={showEdit} onHide={closeEdit} dialogClassName="modal-90w">
            <Form className="formModal" onSubmit={e => editProduct(e, productId)}>
                <Modal.Header closeButton className="bg-blur">
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-light p-4">    
                    <Form.Group controlId="productName">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control 
                        type="text" 
                        value={nameProduct}
                        onChange={e=> setNameProduct(e.target.value)}
                        required
                        />
                    </Form.Group>
                    <Form.Group controlId="productDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control 
                        as="textarea"
                        rows={3}
                        value={descriptionProduct}
                        onChange={e=> setDescriptionProduct(e.target.value)}
                         required/>
                    </Form.Group>
                    <Form.Group controlId="productPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control 
                        type="number"
                        value={price}
                        onChange={e=> setPrice(e.target.value)}
                        required/>
                    </Form.Group> 
                    <Form.Group controlId="productCategory">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            as="select"
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                            required>
                            <option value="Bathroom">Bathroom</option>
                            <option value="Bedroom">Bedroom</option>
                            <option value="Cleaning">Cleaning</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Hardware">Tools</option>
                            <option value="Kitchen">Kitchen</option>
                            <option value="Lighting">Lighting</option>
                            <option value="Living Room">Living Room</option>
                            <option value="Storage">Storage</option>                        
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="productBrand">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control 
                        type="text"
                        value={brand}
                        onChange={e=> setBrand(e.target.value)}
                        required/>
                    </Form.Group>
                    <Form.Group controlId="productStock">
                        <Form.Label>Product Stock</Form.Label>
                        <Form.Control 
                        type="number"
                        value={prodStock}
                        onChange={e=> setProdStock(e.target.value)}
                        required/>
                    </Form.Group>
                    <Form.Group controlId="productImage">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control 
                        type="text"
                        value={image}
                        onChange={e=> setImage(e.target.value)}
                        required/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer className="bg-light">
                    <Button className="btn btn-danger" size="md" onClick={closeEdit}>Close</Button>
                    <Button className="defaultButton" size="md" type="submit">Save</Button>
                </Modal.Footer>
            </Form>
        </Modal>
	</>
	)
}