import React from 'react';
import Banner from '../components/Banner';
import FeaturedProducts from '../components/FeaturedProducts.js';
import Highlights from '../components/Highlights.js';
import UserContext from '../UserContext.js';
import { useContext } from 'react';

export default function Home() {

	const data = {
		title: "Check our products that people loves!",
		content: "Need inspiration on what to get for your home? We've curated our most popular products here.",
		destination: "/products",
		label: "Discover Products"
	}
	return (
		<>
			
			<div className="homeWallpaper">
			<video className="video-background" autoPlay loop muted>
			<source
				// src="https://cdn.coverr.co/videos/coverr-kitchen-in-a-house-6113/1080p.mp4"
				src="https://cdn.coverr.co/videos/coverr-newborn-baby-s-bedroom-6646/1080p.mp4"
				type="video/mp4"
				allowFullScreen
			/>
			</video>
				<h1 className='title-text text-center text-light'><strong>Welcome to <br/>West Coast Comforts</strong></h1>
				<p className='paragraph-text text-center text-light'>Best deals for your home needs. Affordable and quality appliances and furniture!</p>
			</div>
			<Banner data ={data} />
			<FeaturedProducts />
			<Highlights/>
		</>
	)
}