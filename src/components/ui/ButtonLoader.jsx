import React from "react";

export default function ButtonLoader() {
  return (
    <button className="w-full border rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-gray-50 cursor-pointer">
      <span className="text-cyan-500 loading loading-dots loading-md"></span>
    </button>
  );
}
