import React, { Component } from 'react';
import './OrderForm.css'

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: []
    };
  }


  handleSubmit = e => {
    e.preventDefault();
    const newOrder = {
      id: Date.now(),
      ...this.state
    }

    if (newOrder.name || newOrder.ingredients.length !== 0) {
      this.props.addOrder(newOrder)
    } else {
      return 
    }
    this.clearInputs();
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  handleIngredientChange = event => {
    event.preventDefault();
    this.setState({ ingredients: [...this.state.ingredients, event.target.name] })
  }

  handleNameChange = event => {
    this.setState({ [event.target.name]: event.target.value})
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button className={ingredient} key={ingredient} name={ingredient} onClick={event => this.handleIngredientChange(event)}>
          {ingredient}
        </button>
      )
    });

    return (
      <form className="controlled-form">
        <input
          type='text'
          placeholder='Name'
          name='name'
          className="input-name"
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        { ingredientButtons }

        <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>
        {(!this.state.name || this.state.ingredients.length === 0) ? <p className='error'>Please fill out your name and select ingredients to place an order</p> : <button className="submit-order" onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>}
      </form>
    )
  }
}

export default OrderForm;
