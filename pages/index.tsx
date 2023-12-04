import BooksList from "@/components/BooksList";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState('')
  const dataa = axios.get('/api/hello/').then((res:any) => setName(res?.data?.name))
  
  return (
    <>
      <BooksList/>
    </>
  )
}
