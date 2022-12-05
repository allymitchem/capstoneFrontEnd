import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBook } from "../api/books";
import {
  addBookToCart,
  deleteBookFromCart,
  saveLocalCart,
  updateBookQuantity,
} from "../api/carts";
import { EditBookForm, DeleteBookButton } from "./";

const BookPage = ({ user, cart, setCart }) => {
  const [book, setBook] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [readyToEdit, setReadyToEdit] = useState(false);
  const [indexInCart, setIndexInCart] = useState(-1);
  const { itemId } = useParams();

  useEffect(() => {
    async function callGetBook() {
      const bookData = await getBook(itemId);
      if (bookData) {
        const newIndexInCart = cart.items.findIndex(
          (elem) => elem.itemId === bookData.id
        );
        setIndexInCart(newIndexInCart);
        setBook(bookData);
      }
    }
    callGetBook();
  }, [cart]);

  async function handleAdd(event) {
    event.preventDefault();

    if (cart.userId) {
      if (indexInCart === -1) {
        const newCartItem = await addBookToCart({
          cartId: cart.id,
          itemId: book.id,
          quantity,
        });
        const newCart = { ...cart };
        newCart.items = [...cart.items];
        newCart.items.push(newCartItem);
        setCart(newCart);
      } else {
        const newQuantity = cart.items[indexInCart].quantity + Number(quantity);
        const newCartItem = await updateBookQuantity({
          cartItemId: cart.items[indexInCart].id,
          quantity: newQuantity,
        });
        const newCart = { ...cart };
        newCart.items = [...cart.items];
        newCart.items[indexInCart].quantity = newCartItem.quantity;
        setCart(newCart);
      }
    } else {
      if (indexInCart === -1) {
        const newCartItem = {
          ...book,
          itemId: book.id,
          quantity: Number(quantity),
        };
        delete newCartItem.id;
        const newCart = { ...cart };
        newCart.items = [...cart.items];
        newCart.items.push(newCartItem);
        setCart(newCart);
        saveLocalCart(newCart);
      } else {
        const newCart = { ...cart };
        newCart.items = [...cart.items];
        newCart.items[indexInCart].quantity += Number(quantity);
        setCart(newCart);
        saveLocalCart(newCart);
      }
    }
  }

  async function handleDelete(event) {
    event.preventDefault();

    if (user.id) {
      await deleteBookFromCart(cart.items[indexInCart].id);
      const newCart = { ...cart };
      newCart.items = cart.items.filter((_, index) => index != indexInCart);
      setIndexInCart(-1);
      setCart(newCart);
    } else {
      const newCart = { ...cart };
      newCart.items = cart.items.filter((_, index) => index != indexInCart);
      setIndexInCart(-1);
      setCart(newCart);
      saveLocalCart(newCart);
    }
  }

  return (
    <div className="book_page">
      {book ? (
        <>
          <h1 className="book_page_title">{book.title}</h1>
          <h3 className="book_page_author">{book.author}</h3>
          <div>
            <img className="book_page_image" src={book.imageURL} />
            <div className="next_to_picture">
              <h2>Price: ${book.price / 100}</h2>
              {indexInCart !== -1 ? (
                <p className="quant_book_page">Quantity in Cart: {cart.items[indexInCart].quantity}</p>
              ) : null}
              <input
                className="quant_input"
                type="number"
                min="1"
                value={quantity}
                onChange={(elem) => setQuantity(elem.target.value)}
              />
              <button onClick={handleAdd}>
                <span className="material-symbols-outlined">add_shopping_cart</span>
              </button>
              {indexInCart !== -1 ? (
                <button onClick={handleDelete}><span className="material-symbols-outlined">
                delete
                </span></button>
              ) : null}

              {cart.userId == 1 ? (
                <button
                  onClick={() => {
                    setReadyToEdit(!readyToEdit);
                  }}
                >
                  <span class="material-symbols-outlined">
edit
</span>
                </button>
              ) : null}
              {readyToEdit ? (
                <EditBookForm
                  book={book}
                  setBook={setBook}
                  setReady={setReadyToEdit}
                />
              ) : null}
              {/* {cart.userId ==1 ?
                            <DeleteBookButton book={book} setBook={setBook}/>
                            : null} */}
            </div>
          </div>
          <p className="book_description">{book.description}</p>
        </>
      ) : null}
    </div>
  );
};

export default BookPage;
