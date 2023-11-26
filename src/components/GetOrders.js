import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

const GetAllOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${ process.env.REACT_APP_API_URL }/users/orders`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("This is data: ", data);
          const userOrders = data.map((user) => user.orderArray).flat() || [];
          setOrders(userOrders);
        } else {
          console.error('Failed to fetch orders');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="tableClass text-center">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Total Price</th>
            <th>Shipping Address</th>
            <th>Payment Status</th>
            <th>Order Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.totalPrice.toLocaleString('en-US', { style: 'currency', currency: 'PHP' })}</td>
              <td>{order.shippingAddress}</td>
              <td className="text-success">{order.paymentStatus}</td>
              <td className="text-success">{order.orderStatus}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default GetAllOrders;
