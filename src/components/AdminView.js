import { useState, useEffect } from "react";
import { Tab, Table, Tabs } from 'react-bootstrap';
import { Link } from "react-router-dom";
import ArchiveProduct from "./ArchiveProduct";
import EditProduct from "./EditProduct";
import AddProduct from "../pages/AddProduct";
import GetAllOrders from "./GetOrders";


export default function AdminView({ productsData, fetchData }) {
    const [products, setProducts] = useState([])

    const truncateDesc = (text, maxLength) => {
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    }

    useEffect(() => {
        const productsArr = productsData.map(product => {
            return (
                <tr id="adminTable" key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.nameProduct}</td>
                    <td>{truncateDesc(product.descriptionProduct, 40)}</td>
                    <td>{product.price.toLocaleString('en-US', { style: 'currency', currency: 'PHP' })}</td>
                    <td>{product.prodStock}</td>
                    <td className={product.isActive ? "text-success" : "text-danger"}>
					    {product.isActive ? "Available" : "Unavailable"}
				    </td>
                    <td><EditProduct product={product._id} isActive={product.isActive} fetchData={fetchData}/></td>
                    <td><ArchiveProduct product={product._id} isActive={product.isActive} fetchData={fetchData}/></td>
                </tr>
            )
        })

        setProducts(productsArr)
    }, [productsData])


    return (
        <>
            <h1 className="text-center tableTitle"><strong>Admin Dashboard</strong></h1>
            <Tabs defaultActiveKey="home" id="justify-tab-example" className="mb-3" justify>
                <Tab eventKey="home" title="Product Overview">
                    <Table className="tableClass" striped bordered hover responsive>
                        <thead>
                            <tr className="text-center">
                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Availability</th>
                                <th colSpan="2">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {products}
                        </tbody>
                    </Table>	
                </Tab>
                <Tab eventKey="profile" title="Add Product">
                    <AddProduct fetchData={fetchData} />
                </Tab>
                <Tab eventKey="longer-tab" title="All Orders">
                    <GetAllOrders fetchData={fetchData} />
                </Tab>
            </Tabs>
            <div className="paddingT"></div>

            
            
        </>
    )
}