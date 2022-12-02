import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { getAnyCart } from '../api/carts';
import {CartItem} from './'


const CheckoutConfirmation = () => {
    const {cartId} = useParams()
    const [checkedOutCart, setCheckedOutCart] = useState({})

    useEffect(()=> {
        console.log("im in the useEffect")
        async function orderedCart() {
            const order = await getAnyCart(cartId)
            console.log(order, "this is the cart that was ordered")
            setCheckedOutCart(order)    
        }
        orderedCart()
    }, [])





    return (
        <div>
        <h2>Thank you for Shopping With Us!</h2>
        <p>We are getting your order ready!</p>
            {checkedOutCart.items ? checkedOutCart.items.map((elem) => {
                return (
                <>
                <img src={elem.imageURL}/>
                <p><b>Price: </b>${elem.price/100}</p>
                <p><b>Quantity: </b>{elem.quantity}</p>
                </>) 
            }): null}
        </div>

    )
}

export default CheckoutConfirmation