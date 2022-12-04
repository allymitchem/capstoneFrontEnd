import React, { useReducer, useState } from 'react';
import { deleteBookFromCart, saveLocalCart, updateBookQuantity } from '../api/carts';
import Book from './Book';



const CartItem = ({elem, cart, user, setCart}) => {
    const [quantity, setQuantity] = useState(elem.quantity)

    // console.log(cart.items)
    // console.log(elem, "element")
    
    
    const indexInCart = cart.items.findIndex(book => book.itemId == elem.itemId)
    
    async function handleDelete(event) {
        event.preventDefault()
        const unwantedBook = (cart.items[indexInCart].id)
        console.log(cart.items[indexInCart])
        // console.log(unwantedBook, "this is the unwantedBook index")
        if(cart && user.id) {
            const deletedBook = await deleteBookFromCart(unwantedBook)
            console.log(deletedBook)
            const newCart = {...cart}
            newCart.items = cart.items.filter(book => book.itemId !== deletedBook.itemId)
            setCart(newCart)
        } else {            
            const newCart = {...cart}
            newCart.items = cart.items.filter(book => book.itemId !== elem.itemId)
            setCart(newCart)
            saveLocalCart(newCart)
        }
    }
    
    async function handleOnChange(event) {
        event.preventDefault()
        console.log(quantity, "this is the quantity state")
        if (quantity > 0) {
            if(cart.userId) {
                await updateBookQuantity({cartItemId: cart.items[indexInCart].id, quantity: quantity})
                const updatedCart = {...cart}
                updatedCart.items = [...cart.items]
                updatedCart.items[indexInCart].quantity = Number(quantity)
                setCart(updatedCart)
            }else {
                const updatedCart = {...cart}
                updatedCart.items = [...cart.items]
                updatedCart.items[indexInCart].quantity = Number(quantity)
                setCart(updatedCart)
                saveLocalCart(updatedCart)
            }             
        } else if(cart && user.id) {
            const unwantedBook = (cart.items[indexInCart].id)
            const deletedBook = await deleteBookFromCart(unwantedBook)
            console.log(deletedBook)
            const newCart = {...cart}
            newCart.items = cart.items.filter(book => book.itemId !== deletedBook.itemId)
            setCart(newCart)
        } else {            
            const newCart = {...cart}
            newCart.items = cart.items.filter(book => book.itemId !== elem.itemId)
            setCart(newCart)
            saveLocalCart(newCart)
        }
    }
   

    return (
        <div className="cart_list">
            <div className='cart_img'>
                <img src={elem.imageURL}/>
                <p>${elem.price/100}</p>
            </div>
            {/* <div className="cart_price">
                
            </div> */}
            <div className='cart_quantity_buttons'>
                <input type='number' min="0" value={quantity}     onChange={(e) => {setQuantity(e.target.value)}}/>
                <button onClick={handleOnChange}>Change Quantity</button>
                <button onClick={handleDelete}>Remove From Cart</button> 
            </div>
            {/* <div className="cart_quantity_button">
            </div>
            <div className='cart_remove_button'>
            </div> */}
                    
        </div>
        
    )
}

export default CartItem