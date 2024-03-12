import React from "react";
import { useLocation } from "react-router-dom";

const CharSheetPage = () => {
  const location = useLocation();

  const { image, name, race, charClass, backstory, stat } =
    location.state || {};
  console.log(location.state);

  return (
    <div className="body-background">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-3 col-md-4 mb-4 mt-5">
            <div className="d-flex justify-content-center mb-4">
              <button
                type="submit"
                className="btn btn-dark"
                onClick={() => window.location.assign("/app/prompt")}
              >
               Generate New Character
              </button>
            </div>
            {image && (
              <img
                src={image}
                alt="Generated Character"
                className="img-fluid rounded max-height"
              />
            )}
          </div>
          <div className="container d-flex justify-content-center">
            <div className="col-lg-8 col-md-6 mt-1">
              <div className="character-sheet">
                <div className="d-inline-flex flex-column justify-content-start">
                  <h1 className="display-4 char-name">{name}</h1>
                  <p className="lead">
                    <span className="bolded">Race: </span>
                    {race}
                  </p>
                  <p className="lead">
                    <span className="bolded">Class: </span>
                    {charClass}
                  </p>
                  <p className="lead">
                    <span className="bolded">Description: </span>
                    {backstory}
                  </p>
                </div>
                <div className="d-inline-flex flex-column justify-content-end">
                  <p className="lead">
                    <span className="bolded">Stats:</span>
                  </p>
                  <ul>
                    {stat &&
                      Object.keys(stat).map((statKey) => {
                        if (statKey === "__typename") {
                          return null; // Make sure to return null or false instead of just `return` to avoid warning.
                        }
                        // Function to capitalize the first letter of a string
                        const capitalizeFirstLetter = (string) => {
                          return (
                            string.charAt(0).toUpperCase() + string.slice(1)
                          );
                        };
                        const formattedStatKey = capitalizeFirstLetter(statKey);
                        return (
                          <li key={statKey}>
                            {formattedStatKey}: {stat[statKey]}
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharSheetPage;
