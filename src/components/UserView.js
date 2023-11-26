import { Col, Row, Pagination } from "react-bootstrap";
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";


export default function UserView({productsData}) {
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;

    // Calculate the indexes of the products to be displayed on the current page
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = productsData.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );

    // Update the current page
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        // Reset to the first page when productsData changes
        setCurrentPage(1);
    }, [productsData]);

    return (
        <>
            <h2 className="text-center mb-4 paddingT">
                <strong>All Products</strong>
            </h2>
            <Row className="mx-0 ms-5 me-5">
                {currentProducts.map((product) =>
                product.isActive ? (
                    <Col className="mb-4" key={product._id} xs={12} sm={6} md={6} lg={3}>
                    <ProductCard prodProp={product} key={product._id} />
                    </Col>
                ) :  (
                    <Col className="mb-4" key={product._id} xs={12} sm={6} md={6} lg={3}>
                    <ProductCard prodProp={product} key={product._id} />
                    </Col>
                )
                )}
            </Row>
            <Pagination className="mt-4 mb-5 justify-content-center">
                {[...Array(Math.ceil(productsData.length / productsPerPage))].map(
                    (item, index) => (
                        <Pagination.Item
                        className={'paginationItemStyle'}
                        key={index + 1}
                        active={index + 1 === currentPage}
                        onClick={() => handlePageChange(index + 1)}>
                            <a>{index + 1}</a>
                        </Pagination.Item>
                    )
                )}
            </Pagination>
        </>
        
    )
}