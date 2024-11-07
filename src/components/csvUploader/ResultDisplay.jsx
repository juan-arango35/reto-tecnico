import React from "react";

const ResultDisplay = ({ successRecords }) => {
  return (
    <div>
      <h1>Resultados exitosos</h1>
      {
        successRecords.length > 0 ? (
          <ul>
            {successRecords.map((record, index)=>(
              <li key={index}>
                <p>{`ID: ${record.id}`}</p>
                <p>{`Name: ${record.name}`}</p>
                <p>{`Email: ${record.email}`}</p>
                <p>{`Age: ${record.age}`}</p>
              </li>
            ))}
          </ul>

        ) : (
          <p>No se encontraron registros</p>

        )
      }
    </div>
  );
};

export default ResultDisplay;

/* video de papa parse: https://www.youtube.com/watch?v=eUz8ZDsQfP8 */

