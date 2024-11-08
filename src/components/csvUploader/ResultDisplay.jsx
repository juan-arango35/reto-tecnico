import React from "react";
import { Link } from "react-router-dom";
import { CiCircleCheck } from "react-icons/ci";

const ResultDisplay = ({ successRecords, clearRecords }) => {
  return (
    <div className="w-full bg-white flex justify-center items-center h-12 relative  ">
      <div className="border-2 p-2 border-green-600 rounded-2xl">
        {successRecords.length > 0 && (
          <div className="flex gap-2 items-center text-green-600 ">
            <CiCircleCheck />
            <div>{successRecords.length} records uploader successfully</div>
          </div>
        )}
      </div>
      {successRecords.length > 0 && (
        <button onClick={clearRecords} className="absolute right-4 px-4 py-2 font-bold bg-blue-500 hover:bg-blue-700  text-white rounded">
          <Link to="/">Nuevo archivo</Link>
        </button>
      )}
    </div>
  );
};

export default ResultDisplay;
/* 
className={`px-4 py-2 font-bold text-white rounded ${
  isLoading || !file
    ? "bg-gray-300 cursor-not-allowed"
    : "bg-blue-500 hover:bg-blue-700"
}`}
 */
/* video de papa parse: https://www.youtube.com/watch?v=eUz8ZDsQfP8 */
