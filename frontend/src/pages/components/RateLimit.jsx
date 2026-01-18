import React from "react";

const RateLimit = () => {
  return (
    <div className=" flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md rounded-lg bg-white p-6 text-center shadow-md">
        <h1 className="mb-2 text-xl font-semibold text-red-600">
          Too Many Requests
        </h1>

        <p className="mb-4 text-sm text-gray-600">
          You’re sending requests too quickly. Please slow down and try again
          in a moment.
        </p>

        <button
          onClick={() => window.location.reload()}
          className="rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition"
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default RateLimit;
