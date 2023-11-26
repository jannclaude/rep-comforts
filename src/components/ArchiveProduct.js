import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function ArchiveProduct({product, isActive, fetchData}) {
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

	const archiveToggle = (productId) => {
		fetch(`${ process.env.REACT_APP_API_URL }/products/${productId}/archive`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})

		.then(res => res.json())
		.then(data => {
			console.log(data)
			if(data.message === "Product has been archived successfully.") {
				fetchData();
				Toast.fire({
                    title: "Product has been archived successfully",
                    icon: "success",
                });
			}else {
				fetchData();
				Toast.fire({
                    title: "Error in archiving product",
                    icon: "error",
                });
			}


		})
	}

	const activateToggle = (productId) => {
		fetch(`${ process.env.REACT_APP_API_URL }/products/${productId}/activate`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})

		.then(res => res.json())
		.then(data => {
			console.log(data)
			if(data.message === "Product has been activated successfully.") {
				fetchData();
				Toast.fire({
                    title: "Product has been activated successfully",
                    icon: "success",
                });
			}else {
				fetchData();
				Toast.fire({
                    title: "Error in activating product",
                    icon: "error",
                });
			}


		})
	}
	 

		return(
			<>
				{isActive ?

					<Button variant="danger" size="sm" onClick={() => archiveToggle(product)}>Archive</Button>

					:

					<Button variant="success" size="sm" onClick={() => activateToggle(product)}>Activate</Button>

				}
			</>

			)
	}