import React from 'react';
import './Orders.css';

const Orders = (props) => {
  console.log(props.orders)
  const orderEls = props.orders.map(order => {
    return (
      <div key={order.id} className="order">
        <h3>{order.name}</h3>
        <ul className="ingredient-list">
          {order.ingredients.map(ingredient => {
            return <li key={`${ingredient}${Date.now()}`}>{ingredient}</li>
          })}
        </ul>
        <button onClick={() => props.deleteOrder(order.id)}>🗑</button>
      </div>
    )
  });

  return (
    <section className="orders-container">
      { orderEls.length ? orderEls : <p>No orders yet!</p> }
    </section>
  )
}

export default Orders;