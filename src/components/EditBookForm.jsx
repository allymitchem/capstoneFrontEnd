import React, { useState } from "react";
import { patchBook } from "../api/books";

const EditBookForm = ({ book, setBook, setReady }) => {
  //We set the state of the input fields to auto fill with the details of the book selected.
  const [inputField, setInputField] = useState({
    title: book.title,
    author: book.author,
    genre: book.genre,
    imageURL: book.imageURL,
    description: book.description,
    year: book.year,
    price: book.price,
    numInStock: book.numInStock,
  });

  //On submission, we send the updated state from the return to the database via the patchBook function. We then set editedBook as the variable containing the updated version of the book. That then gets passed to the book state via setBook. At that point, ready state is then set to false which then closes our form.
  async function handleSubmit(event) {
    event.preventDefault();

    const editedBook = await patchBook(book.id, inputField);

    setBook(editedBook);

    setReady(false);
  }

  return (
    <div>
      <form className="edit_form" onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          placeholder="Title"
          required
          onChange={(event) =>
            setInputField({ ...inputField, title: event.target.value })
          }
          value={inputField.title}
        />
        <label>Author: </label>
        <input
          type="text"
          placeholder="Author"
          required
          onChange={(event) =>
            setInputField({ ...inputField, author: event.target.value })
          }
          value={inputField.author}
        />
        <label>Genre: </label>
        <select
          type="text"
          placeholder="Genre"
          required
          onChange={(event) =>
            setInputField({ ...inputField, genre: event.target.value })
          }
          value={inputField.genre}
        >
        <option value="fantasy">Fantasy</option>
        <option value="mystery">Mystery</option>
        <option value="classics">Classics</option>
        <option value="romance">Romance</option>
        <option value="youngAdult">Young Adult</option>
        </select>

        <label>Image URL: </label>
        <input
          type="text"
          placeholder="Image URL"
          required
          onChange={(event) =>
            setInputField({ ...inputField, imageURL: event.target.value })
          }
          value={inputField.imageURL}
        />
        <label>Description: </label>
        <input
          type="text"
          placeholder="Description"
          required
          onChange={(event) =>
            setInputField({ ...inputField, description: event.target.value })
          }
          value={inputField.description}
        />
        <label>Year: </label>
        <input
          type="number"
          placeholder="Year"
          required
          onChange={(event) =>
            setInputField({ ...inputField, year: event.target.value })
          }
          value={inputField.year}
        />
        <label>Price: </label>
        <input
          type="number"
          placeholder="Price"
          required
          onChange={(event) =>
            setInputField({ ...inputField, price: event.target.value })
          }
          value={inputField.price}
        />
        <label>Number In Stock: </label>
        <input
          type="text"
          placeholder="Number in stock"
          required
          onChange={(event) =>
            setInputField({ ...inputField, numInStock: event.target.value })
          }
          value={inputField.numInStock}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditBookForm;
