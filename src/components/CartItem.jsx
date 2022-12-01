import React, { useReducer, useState } from 'react';
import { deleteBookFromCart, saveLocalCart } from '../api/carts';
import Book from './Book';



const CartItem = ({elem, cart, user, setCart}) => {
    const [quantity, setQuantity] = useState(elem.quantity)
    console.log(quantity, "this is the quantity state")

    const indexInCart = cart.items.findIndex(book => book.itemId == elem.itemId)
    // console.log(cart.items)
    // console.log(elem, "element")



    async function handleDelete(event) {
        event.preventDefault()
        const unwantedBook = (cart.items[indexInCart].itemId)
        if(cart && user.id) {
            const deletedBook = await deleteBookFromCart(unwantedBook)
            const newCart = {...cart}
            newCart.items = cart.items.filter(book => book.itemId !== deletedBook.itemId)
            setCart(newCart)
        } else {            
            const newCart = {...cart}
            newCart.items = cart.items.filter(book => book.itemId !== unwantedBook)
            setCart(newCart)
            saveLocalCart(newCart)
        }
    }

    async function handleOnChange (event) {
        event.preventDefault()
        if(cart.userId) {

        }else {
            
        }
        
        
    }
   

    return (
        <div className="cart_list">          
            <img src={elem.imageURL}/>
            <p>${elem.price/100}</p>
            <input type='number' value={quantity} onChange={(elem) => setQuantity(elem.target.value)}/>
            {/* <p>Quantity: {elem.quantity}</p> */}
            <button onClick={handleDelete}>Remove From Cart</button> 
                    
        </div>
        
    )
}

export default CartItem