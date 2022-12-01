import React from 'react';
import BookList from './BookList';
import {CartList} from './'

const CartPage = ({cart}) => {




    return (
        <div className="cart_page">
            {cart && cart.items.length ?
            cart.items.map((elem, index) => <CartList key={`elem_${index}`} elem={elem} />)
            
            
             : "Life is full and overflowing with the new. But it is necessary to empty out the old to make room for the new to enter. - Eileen Caddy"}
            <p>Subtotal</p>
            <button>Checkout</button>
        </div>
    )
    
}

export default CartPage