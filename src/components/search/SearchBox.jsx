import React, { useEffect, useState } from "react";
import { searchBooks } from "../../redux/action/searchBookaction";
import { selectBooks, setBooks } from "../../redux/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function SearchBox() {
  const [userInput, setUserInput] = useState("");
  const dispatch = useDispatch();
  const books = useSelector(selectBooks);
  const loading = useSelector((state) => state.search.loading);
  const error = useSelector((state) => state.search.error);
  console.log(books);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(searchBooks(userInput));
  };
  const handleInputChange = (e) => {
    const value = e.target.value;
    setUserInput(value);

    // Clear search results when the search box is cleared
    if (value === "") {
      dispatch(setBooks([]));
    }
  };
  return (
    <>
      <div
        className="bg-cover bg-center h-72 p-10"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJvb2tzfGVufDB8fDB8fHww')",
        }}
      >
        <form onSubmit={handleFormSubmit} className="max-w-md mx-auto mt-10">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <input
              type="search"
              value={userInput}
              onChange={handleInputChange}
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg dark:bg-gray-900 focus:ring-blue-500 focus:border-gray-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
              placeholder="Search Books..."
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 bg-gradient-to-r from-indigo-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      {loading && <p className="text-center">Loading...</p>}
      {error && <p>Error: {error}</p>}
      {books.length > 0 && (
        <div className="flex flex-wrap mt-4 justify-center items-center">
          {books.map((book) => (
            <div
              key={book.id}
              className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4 justify-center items-center flex"
            >
              <div className="max-w-sm rounded overflow-hidden shadow-lg">
                {book.volumeInfo.imageLinks ? (
                  <LazyLoadImage
                    effect="blur"
                    src={book.volumeInfo.imageLinks.smallThumbnail}
                    //   alt={book.volumeInfo.title}
                    className="object-scale-down h-48 w-96 "
                  />
                ) : (
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png" // Set the path to your default image
                    alt={book.volumeInfo.title}
                    className="object-scale-down h-48 w-96"
                  />
                )}

                <div className="px-6 py-4 ">
                  <div className="font-bold text-xl mb-2">
                    {book.volumeInfo.title}
                  </div>
                  <p className="text-gray-700 text-base">
                    Authors:{" "}
                    {book.volumeInfo.authors
                      ? book.volumeInfo.authors.join(", ")
                      : "N/A"}
                  </p>

                  <button
                    type="button"
                    class="text-white bg-[#0d0d0d] hover:bg-[#6366f1]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 gap-2 rounded-lg text-sm px-3 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 "
                  >
                    <Link to={`/book/${book.id}`} className="text-black-500 ">
                      View Details
                    </Link>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default SearchBox;
