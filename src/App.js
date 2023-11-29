import NavScroll from './components/AppNavbar';

import Cart from './components/Cart';
import Error from './pages/Error';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Products from './pages/Products';
import ProductView from './pages/ProductView';
import Profile from './pages/Profile';
import Register from './pages/Register';

import './App.css';

import { Container } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { UserProvider } from './UserContext';

function App() {

	const [user, setUser] = useState({
		id: null,
		isAdmin: null,
		firstName: null
	})

	const unsetUser = () => {
		localStorage.clear();
	}

	useEffect(() => {
		const token = localStorage.getItem('token');
		fetch(`${ process.env.REACT_APP_API_URL }/users/userDetails`, {
			headers: {
				Authorization: `Bearer ${token}`,
			}
		})
		.then(res => res.json())
		.then(data => {
		if (typeof data._id !== "undefined") {

			setUser({
				id: data._id,
				isAdmin: data.isAdmin,
				firstName: data.firstName
			});

		} else {

			setUser({
				id: null,
				isAdmin: null,
				firstName: null
			})
		}
		})
		console.log(localStorage);
	}, [])
	

	return (
		<UserProvider value={{ user, setUser, unsetUser }}>
			<Router>
				<NavScroll />
				<Container fluid className="p-0">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/products" element={<Products />} />
						<Route path="/products/:productId" element={<ProductView />} />
						<Route path="/register" element={<Register />} />
						<Route path="/login" element={<Login />} />
						<Route path="/logout" element={<Logout />} />												
						<Route path="*" element={<Error />} />						
						<Route path="/profile" element={<Profile />} />						
						<Route path="/cartItems" element={<Cart />} />						
					</Routes>
				</Container>
				<Footer />
			</Router>
		</UserProvider>
		
	)
	

}

export default App;
