import { useState, useEffect } from 'react';
import Profile from '../pages/Profile';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`${ process.env.REACT_APP_API_URL }/users/userDetails`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          if (typeof data._id !== "undefined") {
            setCartItems(data.cartItems || []);
          }
        } else {
          console.error('Error fetching user details:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchCartItems();
  }, []);

  return (
    <>
      {
        <Profile cartItems={cartItems} />
      }
    </>
    
  ) 
}
