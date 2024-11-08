import { CiCircleCheck } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const ResultDisplay = ({ successRecords, clearRecords,showFormFn  }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    showFormFn()
    navigate("/");
    clearRecords();
  };
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
        <button
          onClick={handleClick}
          className="absolute right-4 px-4 py-2 font-bold bg-blue-500 hover:bg-blue-700  text-white rounded"
        >
          Nuevo Archivo
        </button>
      )}
    </div>
  );
};

export default ResultDisplay;

