import React from 'react';



const CartList = ({elem, }) => {
   

    return (
        <div className="cart_list">           
            <img src={elem.imageURL}/>
            <p>${elem.price/100}</p>
            <p>Quantity: {elem.quantity}</p>
            <button>Remove From Cart</button>         
        </div>
        
    )
}

export default CartList