import { NextApiRequest, NextApiResponse } from "next";
import mongodb, { MongoClient } from "mongodb";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await MongoClient.connect(
    "mongodb+srv://admin:<password>@cluster0.n0huuak.mongodb.net/"
  );

  //create DB
  const db = client.db("books");

  if (req.method === "GET") {
    let books: any;
    try {
      books = await db.collection("books").find().toArray();
    } catch (error) {
      return console.log(error);
    }
    if (!books) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
    return res.status(200).json({ message: { books: books } });
  } else if (req.method === "POST") {
    const { name, author, genre } = req.body;
    if (
      !name ||
      name.trim() === "" ||
      !genre ||
      genre.trim() === "" ||
      !author ||
      author.trim() === ""
    ) {
      return res.status(422).json({ message: "Invalid Data" });
    }
    const newBook = {
      name,
      genre,
      author,
      id: Date.now(),
    };
    let generatedBook: any;
    try {
      generatedBook = await db.collection("books").insertOne(newBook);
    } catch (error) {
      return console.log(error);
    }
    return res.status(201).json({ message: "Added", book: newBook });
  }
};
export default handler;
