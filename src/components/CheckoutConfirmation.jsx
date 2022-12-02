import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { getCheckedOutCart } from '../api/carts';
import {CartItem} from './'


const CheckoutConfirmation = () => {
    const {cartId} = useParams()
    const [checkedOutCart, setCheckedOutCart] = useState({})

    // useEffect(()=> {
    //     async function orderedCart() {
    //         const order = await getCheckedOutCart(cartId)
    //         console.log(order, "this is the cart that was ordered")
    //         setCheckedOutCart(order)    
    //     }
    //     orderedCart()
    // }, [])





    return (
        <div>
        <h2>Thank you for Shopping With Us!</h2>
        <p>We are getting your order ready!</p>
        </div>

    )
}

export default CheckoutConfirmation