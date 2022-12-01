import React, {useEffect, useState} from 'react';
import { getCart } from '../api/carts';
import BookList from './BookList';

const CartPage = ({cart}) => {
    console.log(cart)




    return (
        <div className="cart_page">
            {cart && cart.items.length ? <BookList list={cart.items}/> : "Your cart is empty!  Go add some books!"}


        </div>
    )
    
}






export default CartPage