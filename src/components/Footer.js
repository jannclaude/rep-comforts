import React from 'react';
import { FaFacebookSquare, FaTwitterSquare, FaInstagram } from "react-icons/fa";

	const Footer = () => {
		return (
		<footer className=" bg-dark text-light  py-5">
			<div className="container justify-content-center align-items-center">
				<div className="d-flex row justify-content-between">
						<div className="col-md-3 text-start me-5">
						<h5>WCC Family</h5>
						<p>West Coast Comforts: Elevating Homes, Elevating Lives. Discover a curated collection of furniture and decor essentials, blending style and comfort seamlessly. From statement furniture to intricate details, we offer everything you need to create a home that resonates with your unique taste. Explore the art of living well with West Coast Comforts.</p>
						</div>

						<div className="footerCol col-md-3 text-start">
						<h5>Services</h5>
						<ul className="list-unstyled">
							<li className="mb-1"><a href="#" className="text-decoration-none text-light">FAQ</a></li>
							<li className="mb-1"><a href="#" className="text-decoration-none text-light">Guarantees</a></li>
							<li className="mb-1"><a href="#" className="text-decoration-none text-light">Buying guides</a></li>
							<li className="mb-1"><a href="#" className="text-decoration-none text-light">Customer service</a></li>
							<li className="mb-1"><a href="#" className="text-decoration-none text-light">Share your feedback</a></li>
							<li className="mb-1"><a href="#" className="text-decoration-none text-light">Spare parts</a></li>
						</ul>
						</div>

						<div className="footerCol col-md-3 text-start">
						<h5>News and Media</h5>
						<ul className="list-unstyled">
							<li className="mb-1"><a href="#" className="text-decoration-none text-light">Newsroom</a></li>
							<li className="mb-1"><a href="#" className="text-decoration-none text-light">Media resources</a></li>
							<li className="mb-1"><a href="#" className="text-decoration-none text-light">Corporate news</a></li>
							<li className="mb-1"><a href="#" className="text-decoration-none text-light">Updates</a></li>
						</ul>
						</div>

						<div className="footerCol col-md-3 text-start">
						<h5>Socials</h5>
						<ul className="list-unstyled">
							<li className="mb-1"><a href="#" className="text-decoration-none text-light"><FaFacebookSquare size={18} /> &nbsp; Facebook</a></li>
							<li className="mb-1"><a href="#" className="text-decoration-none text-light"><FaTwitterSquare size={18} /> &nbsp; Twitter</a></li>
							<li className="mb-1"><a href="#" className="text-decoration-none text-light"><FaInstagram size={18} /> &nbsp; Instagram</a></li>
						</ul>
						</div>
				</div>
				<div className="d-flex row justify-content-between mt-4">
					<div className="col-md-6">
						<p>© 2023 Jann Claude.</p>
					</div>
					<div className="d-flex row col-md-6">
						<div className="col-md-3"><a href="#" className="text-decoration-none text-light">Cookie policy</a></div>
						<div className="col-md-3"><a href="#" className="text-decoration-none text-light">Privacy notice</a></div>
						<div className="col-md-3"><a href="#" className="text-decoration-none text-light">Terms of use</a></div>
						<div className="col-md-3"><a href="#" className="text-decoration-none text-light">Terms of purchase</a></div>
					</div>
				</div>
			</div>
		</footer>
		);
	};

export default Footer;
