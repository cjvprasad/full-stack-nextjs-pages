import React, { useState } from "react";
import styles from "../styles/AddBook.module.css";
import axios from "axios";
import Link from "next/link";

interface InputState {
  name: string;
  genre: string;
  author: string;
}

const AddBookForm: React.FC = () => {
  const [input, setInput] = useState<InputState>({
    name: "",
    genre: "",
    author: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const sendData = () => {
    const data = axios
      .post(
        "/api/books/",
        {
          name: input.name.trim(),
          author: input.author.trim(),
          genre: input.genre.trim(),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        // Handle the response
        console.log(response);
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });
  };

  return (
    <>
      <div className={styles.container}>
        <label className={styles.label}>
          Book Name:
          <input
            type="text"
            name="name"
            value={input.name}
            onChange={handleInputChange}
            className={styles.input}
          />
        </label>
        <br />
        <label className={styles.label}>
          Genre:
          <input
            type="text"
            name="genre"
            value={input.genre}
            onChange={handleInputChange}
            className={styles.input}
          />
        </label>
        <br />
        <label className={styles.label}>
          Author:
          <input
            type="text"
            name="author"
            value={input.author}
            onChange={handleInputChange}
            className={styles.input}
          />
        </label>
        <br />
        <button className={styles.button} onClick={sendData}>
          Add Book
        </button>
      </div>
      <Link className={styles.button} href={"/"}>
        Go back to Books
      </Link>
    </>
  );
};

export default AddBookForm;
