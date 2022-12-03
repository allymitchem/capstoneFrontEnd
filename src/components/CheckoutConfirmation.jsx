import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { getAnyCart } from "../api/carts"
import { CartItem } from "./"

const CheckoutConfirmation = ({ cart }) => {
    const { cartId } = useParams()
    const [checkedOutCart, setCheckedOutCart] = useState({})

    useEffect(() => {
        async function orderedCart() {
            const order = await getAnyCart(cartId)
            setCheckedOutCart(order)
        }
        orderedCart()
    }, [])

    return (
        <div>
            <h2>Thank you for Shopping With Us!</h2>
            <p>
                Did you forget something?<Link to="/products">Continue Shopping</Link>
            </p>

            <p>Here's Your Order</p>
            {checkedOutCart.items
                ? checkedOutCart.items.map((elem) => {
                      return (
                          <div key={`elem_id${elem.id}`}>
                              <img src={elem.imageURL} />
                              <p>
                                  <b>Price: </b>${elem.price / 100}
                              </p>
                              <p>
                                  <b>Quantity: </b>
                                  {elem.quantity}
                              </p>
                          </div>
                      )
                  })
                : null}
            {checkedOutCart.items ? (
                <p>
                    Total: $
                    {checkedOutCart.items.reduce(
                        (sum, elem) => (sum += elem.price * elem.quantity),
                        0
                    ) / 100}
                </p>
            ) : null}
        </div>
    )
}

export default CheckoutConfirmation
