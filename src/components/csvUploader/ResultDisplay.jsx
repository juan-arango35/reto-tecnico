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
        <button onClick={clearRecords} className="absolute right-4">
          <Link to="/">Nuevo archivo</Link>
        </button>
      )}
    </div>
  );
};

export default ResultDisplay;

/* video de papa parse: https://www.youtube.com/watch?v=eUz8ZDsQfP8 */
