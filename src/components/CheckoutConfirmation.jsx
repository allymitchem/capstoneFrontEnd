import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getAnyCart } from "../api/carts";
import { CartItem } from "./";

const CheckoutConfirmation = () => {

    const { cartId } = useParams()
    const [checkedOutCart, setCheckedOutCart] = useState({})


  useEffect(() => {
    async function orderedCart() {
      const order = await getAnyCart(cartId);
      setCheckedOutCart(order);
    }
    orderedCart();
  }, []);

  return (
    <div className="checkout_page">
      <h2 className="checkout_header">Thank you for Shopping With Us!</h2>
      <span className="checkout_reminder">
        Did you forget something?
        <Link
          style={{ marginLeft: ".5rem" }}
          className="continue_shopping"
          to="/products"
        >
          Continue Shopping
        </Link>
      </span>

      <p className="checkout_order">Here's Your Order</p>
      {checkedOutCart.items ? (
        <p className="checkout_total">
          Total: $
          {checkedOutCart.items.reduce(
            (sum, elem) => (sum += elem.price * elem.quantity),
            0
          ) / 100}
        </p>
      ) : null}
      {checkedOutCart.items
        ? checkedOutCart.items.map((elem) => {
            return (
              <div className="checkout_book_box" key={`elem_id${elem.id}`}>
                <div className="checkout_book_sub">
                    <img className="checkout_img" src={elem.imageURL} />

                  <div className="checkout_book_info">
                    
                    <p className="checkout_title">
                      <b>Title: </b>
                      {elem.title}
                    </p>
                    <p className="checkout_author">
                      <b>By: </b>
                      {elem.author}
                    </p>
                    <p className="checkout_quantity">
                      <b>Quantity: </b>
                      {elem.quantity}
                    </p>
                    <p className="checkout_price">
                      <b>Price: </b>${elem.price / 100}
                    </p>
                  </div>
                    
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default CheckoutConfirmation;
