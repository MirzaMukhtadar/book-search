import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  fetchBookDetails,
  selectBookDetails,
} from "../../redux/bookDetailsSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function BookDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const bookDetails = useSelector(selectBookDetails);
  console.log("Data", bookDetails);

  useEffect(() => {
    dispatch(fetchBookDetails(id));
  }, [dispatch, id]);

  // Check if bookDetails is null or undefined
  if (!bookDetails || !bookDetails.volumeInfo) {
    return <p>Loading book details...</p>;
  }

  // Check if volumeInfo exists before accessing its properties
  const { volumeInfo } = bookDetails;

  return (
    <div className="max-w-7xl mx-auto mt-10 ">
      <Link to={"/"}>
        <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
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
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>

          <span>Back</span>
        </button>
      </Link>

      <div className="flex flex-wrap mt-4 justify-center items-center">
        <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4 justify-center items-center flex">
          <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <p className="text-gray-700 text-base font-bold">
              <p className="text-center">Title: {volumeInfo.title}</p>
            </p>

            {volumeInfo.imageLinks ? (
              <LazyLoadImage
                effect="blur"
                src={volumeInfo.imageLinks.smallThumbnail}
                alt={volumeInfo.title}
                className="object-scale-down h-48 w-96 "
              />
            ) : (
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png" // Set the path to your default image
                alt={volumeInfo.title}
                className="object-scale-down h-48 w-96"
              />
            )}
            <div className="px-6 py-4 ">
              <div className="font-bold  mb-2">
                <p className="text-center">
                  Authors:{" "}
                  {volumeInfo.authors ? volumeInfo.authors.join(", ") : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 rounded overflow-hidden shadow-lg px-4 py-6 ">
        <p>
          Description: {volumeInfo.description ? volumeInfo.description : "N/A"}
        </p>
      </div>
    </div>
  );
}

export default BookDetails;
