import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard";
const Favourites = () => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const [FavouriteBooks, setFavouriteBooks] = useState();
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://bookheaven-jruh.onrender.com/api/v1/get-favourite-books",
        { headers }
      );
      setFavouriteBooks(response.data.data);
    };
    fetch();
  }, [FavouriteBooks]);

  return (
    <>
      {FavouriteBooks && FavouriteBooks.length === 0 && (
        <div className="text-5xl font-semibold text-zinc-500 flex items-center justify-center h-full w-full">
          No favourite book
        </div>
      )}
      <div className="grid grid-cols-3 gap-4">
        {FavouriteBooks &&
          FavouriteBooks.map((items, i) => (
            <div key={i}>
              <BookCard data={items} favourite={true} />
            </div>
          ))}
      </div>
    </>
  );
};

export default Favourites;
