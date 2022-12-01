import React, { useReducer } from 'react';
import { deleteBookFromCart } from '../api/carts';
import Book from './Book';



const CartList = ({elem, cart, user, setCart}) => {
    const indexInCart = cart.items.findIndex(book => book.itemId == elem.itemId)



    async function handleDelete(event) {
        event.preventDefault()
        if(cart && user.id) {
            const unwantedBook = (cart.items[indexInCart].id)
            const deletedBook = await deleteBookFromCart(unwantedBook)
            const newCart = {...cart}
            newCart.items = cart.items.filter(book => book.itemId !== deletedBook.itemId)
            setCart(newCart)   

}

    }
   

    return (
        <div className="cart_list">           
            <img src={elem.imageURL}/>
            <p>${elem.price/100}</p>
            <p>Quantity: {elem.quantity}</p>
            <button onClick={handleDelete}>Remove From Cart</button>         
        </div>
        
    )
}

export default CartList