// BooksList.tsx
import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from '../styles/Booklist.module.css';
import Link from "next/link";

const BooksList = () => {
  const [data, setdata] = useState([]);

  const fetchData = () => {
    const data = axios
      .get("/api/books/")
      .then((res: any) => setdata(res.data?.message?.books))
      .catch((e) => console.log(e));
  };

  console.log(data);
  
  useEffect(() => {
    fetchData()
  }, []);

  
  return (
    <div className={styles.booksListContainer}>
      <ul className={styles.booksList}>
        {data && data.map((book: any, index: any) => (
          <li key={index} className={styles.bookItem}>
            <h1>{book.name}</h1>
            <h2>{book.author}</h2>
            <h1>{book.genre}</h1>
            <Link href={'/add'}>Add a new Book</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BooksList;
