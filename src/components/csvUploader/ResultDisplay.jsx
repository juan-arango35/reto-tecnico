import React from "react";

const ResultDisplay = ({ successRecords }) => {
  return (
    <div>
      <h2>Registros exitosos:</h2>
      {
        successRecords.length === 0 ? (
          <p>No hay registros exitosos</p>
        ): (
          <ul>
            {
              successRecords.map((item)=>(
                <li>
                  {item.name} - {item.email} - {item.age} 
                </li>
              ))
            }
          </ul>
        )
      }
    </div>
  );
};

export default ResultDisplay;

/* video de papa parse: https://www.youtube.com/watch?v=eUz8ZDsQfP8 */

