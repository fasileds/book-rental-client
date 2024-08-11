import React from "react";

export default function CheckedState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
        <img
          src="./waiting-icon.png" // Optional: Add a relevant image or icon
          alt="Waiting"
          className="w-24 mx-auto mb-4"
        />
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">
          Awaiting Approval
        </h1>
        <p className="text-gray-600 mb-6">
          It looks like your account is still under review. Please be patient
          while we verify your details.
        </p>
        <p className="text-gray-500 mb-4">
          If you have any questions or need assistance, feel free to contact our
          support team.
        </p>
        <a href="/contact" className="text-blue-600 hover:underline">
          Contact Support
        </a>
      </div>
    </div>
  );
}
