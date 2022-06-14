import React, { Component } from 'react';
import './App.css';
import {getOrders} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      orders: []
    }
  }
 
  componentDidMount() {
    getOrders().then(data => this.setState({ orders: data.orders }))
      .catch(err => console.error('Error fetching:', err));
  }

  addOrder = (newOrder) => {
    fetch('http://localhost:3001/api/v1/orders', {
      method: 'POST',
      body: JSON.stringify({
        "name": newOrder.name,
        "ingredients": newOrder.ingredients
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        return response.json()
      }
    }).then(() => this.setState({ orders: [...this.state.orders, newOrder] }))
  }

  deleteOrder = (id) => {
    console.log(id)
    const filterOrders = this.state.orders.filter(order => order.id !== id)

    this.setState({ orders: filterOrders })
  }
  
  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm addOrder={this.addOrder}/>
        </header>

        <Orders orders={this.state.orders} deleteOrder={this.deleteOrder}/>
      </main>
    );
  }
}


export default App;
