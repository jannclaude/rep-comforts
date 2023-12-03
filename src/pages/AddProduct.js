import {useState,useEffect, useContext} from 'react';
import {Form,Button} from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';

export default function AddProduct(){


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

    const {user} = useContext(UserContext);

	//input states
	const [nameProduct, setNameProduct] = useState("");
	const [descriptionProduct, setDescriptionProduct] = useState("");
	const [price, setPrice] = useState("");
	const [brand, setBrand] = useState("");
	const [prodStock, setProdStock] = useState("");
	const [image, setImage] = useState("");
	const [category, setCategory] = useState("");
	const [isActive, setIsActive] = useState(true);
	const [isButtonActive, setIsButtonActive] = useState(false);

	useEffect(() => {
        if (nameProduct !== '' && descriptionProduct !== '' && price !== '' && brand !== '' && prodStock !== '' && image !== '' && category !== '') {
            setIsButtonActive(true);
            
        } else {

            setIsButtonActive(false);
        }

    	},[nameProduct, descriptionProduct, price, brand, prodStock, image, category]);

	function createCourse(e){

		//prevent submit event's default behavior
		e.preventDefault();

		let token = localStorage.getItem('token');
		console.log(token);

		fetch(`${ process.env.REACT_APP_API_URL }/products/add`,{

			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify({

				nameProduct: nameProduct,
				descriptionProduct: descriptionProduct,
				price: price,
                brand: brand,
                prodStock: prodStock,
                image: image,
                category: category,
                isActive: isActive
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);

			if(data){
				Toast.fire({
                    title: "Product created!",
                    icon: "success",
                });
			} else {
                Toast.fire({
                    title: "Product creation failed!",
                    icon: "error",
                });
                console.log("Error")
			}

		})

        setNameProduct("")
        setDescriptionProduct("")
        setPrice(0);
        setBrand("");
        setProdStock(0);
        setImage("");
        setCategory("");
        
	}

	return (

        (user.isAdmin === true)
        ?
        <>
            <Form className="addForm" onSubmit={e => createCourse(e)}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="'Kitchen Table',   'Bathroom Towel',   'Single-size Bed'" required value={nameProduct} onChange={e => {setNameProduct(e.target.value)}}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label className="mt-3">Description</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Write a catchy and informative product description here..." required value={descriptionProduct} onChange={e => {setDescriptionProduct(e.target.value)}}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label className="mt-3">Price</Form.Label>
                    <Form.Control type="number" placeholder="Enter Price" required value={price} onChange={e => {setPrice(e.target.value)}}/>
                </Form.Group>
				<Form.Group>
                    <Form.Label className="mt-3">Brand</Form.Label>
                    <Form.Control type="text" placeholder="'IKEA',   'Haier',   'Bosch'" required value={brand} onChange={e => {setBrand(e.target.value)}}/>
                </Form.Group>
				<Form.Group>
                    <Form.Label className="mt-3">Stocks</Form.Label>
                    <Form.Control type="number" placeholder="Enter Stock" required value={prodStock} onChange={e => {setProdStock(e.target.value)}}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label className="mt-3">Category</Form.Label>
                    <Form.Control
                        as="select"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        required>
                        <option value="" disabled>Select Category</option>
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
				<Form.Group>
                    <Form.Label className="mt-3">Image URL</Form.Label>
                    <Form.Control type="text" placeholder="https://" required value={image} onChange={e => {setImage(e.target.value)}}/>
                </Form.Group>
                {
                	isButtonActive

                	? <Button className="defaultButton mt-4 mb-4" type="submit">Create Product</Button>

                	: <Button className="defaultButton mt-4 mb-4" disabled>Create Product</Button>

                }
            </Form>
	    </>
        :
        <Navigate to="/products" />

)


}