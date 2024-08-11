import React from "react";
import { Link } from "react-router-dom";

export default function LendingPage() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-9 h-screen p-4 bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="my-3 ml-10">
        <div className="card shadow-lg rounded-lg overflow-hidden bg-white">
          <img
            src="https://media.istockphoto.com/id/1916911473/photo/elderly-man-book-and-coffee-on-sofa-with-smile-reading-or-relax-in-retirement-in-home-living.jpg?s=1024x1024&w=is&k=20&c=NHkFxXQJyYbGaMqPPKXsWClnneBUk1-wyBBNIbXqYf4="
            className="h-[100px] w-[300px] object-cover"
            alt="OWNERS"
          />
          <div className="card-body text-center p-4">
            <h5 className="card-title text-xl font-semibold text-gray-800 mb-3">
              OWNER
            </h5>
            <Link
              to="/owner/login"
              className="btn btn-primary bg-blue-500 text-white py-2 px-4 rounded-lg shadow"
            >
              Let's Go
            </Link>
          </div>
        </div>
      </div>
      <div className="my-3 ml-10">
        <div className="card shadow-lg rounded-lg overflow-hidden bg-white">
          <img
            src="https://media.istockphoto.com/id/1916911473/photo/elderly-man-book-and-coffee-on-sofa-with-smile-reading-or-relax-in-retirement-in-home-living.jpg?s=1024x1024&w=is&k=20&c=NHkFxXQJyYbGaMqPPKXsWClnneBUk1-wyBBNIbXqYf4="
            className="h-[100px] w-[300px] object-cover"
            alt="ADMIN"
          />
          <div className="card-body text-center p-4">
            <h5 className="card-title text-xl font-semibold text-gray-800 mb-3">
              ADMIN
            </h5>
            <Link
              to="/admin/login"
              className="btn btn-primary bg-blue-500 text-white py-2 px-4 rounded-lg shadow"
            >
              Let's Go
            </Link>
          </div>
        </div>
      </div>
      <div className="my-3">
        <div className="card shadow-lg rounded-lg overflow-hidden bg-white">
          <img
            src="https://media.istockphoto.com/id/1916911473/photo/elderly-man-book-and-coffee-on-sofa-with-smile-reading-or-relax-in-retirement-in-home-living.jpg?s=1024x1024&w=is&k=20&c=NHkFxXQJyYbGaMqPPKXsWClnneBUk1-wyBBNIbXqYf4="
            className="h-[100px] w-[300px] object-cover"
            alt="USER"
          />
          <div className="card-body text-center p-4">
            <h5 className="card-title text-xl font-semibold text-gray-800 mb-3">
              USER
            </h5>
            <Link
              to="/user/login"
              className="btn btn-primary bg-blue-500 text-white py-2 px-4 rounded-lg shadow"
            >
              Let's Go
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
