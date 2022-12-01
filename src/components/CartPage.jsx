import React from 'react';
import BookList from './BookList';
import {CartList} from './'
import { getAllBooks } from '../api/books';

const CartPage = ({cart}) => {


    async function handleCheckout(event) {
        event.preventDefault()

        //check that we have enough stock
        const newStock = cart.items.map(elem => {return {...elem, numInStock: elem.numInStock - elem.quantity}})
        if (newStock.every((elem) => elem.numInStock > 0)) {
            //remove the cart quantity from the stock
            //mark the cart as inactive
        } else {
            alert("There is not enough stock")
        }

    }

    return (
        <div className="cart_page">
            {cart && cart.items.length ?
            cart.items.map((elem, index) => <CartList key={`elem_${index}`} elem={elem} />)
            
            
             : "Life is full and overflowing with the new. But it is necessary to empty out the old to make room for the new to enter. - Eileen Caddy"}
            <p>Subtotal: ${cart.items.reduce((sum, elem) => sum += elem.price * elem.quantity,0)/100}</p>
            <button onClick={handleCheckout}>Checkout</button>
        </div>
    )   
}

export default CartPage