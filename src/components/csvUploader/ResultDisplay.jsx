import React from "react";

const ResultDisplay = ({ successRecords }) => {
  return (
    <div>
      {successRecords.length > 0 && (
        <div>
          <h2>Registros exitosos:</h2>
          <ul>
            {successRecords.map((item) => (
              <li>
                {item.name} - {item.email} - {item.age}
              </li>
            ))}
          </ul>
          <div>{successRecords.length} records uploader successfully</div>
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;

/* video de papa parse: https://www.youtube.com/watch?v=eUz8ZDsQfP8 */
