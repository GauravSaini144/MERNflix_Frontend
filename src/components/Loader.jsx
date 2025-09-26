// Loader.jsx
import React from "react";

function Loader() {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
    </div>
  );
}

export default Loader;
