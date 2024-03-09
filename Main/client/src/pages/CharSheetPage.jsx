import React from "react";
import { useLocation } from "react-router-dom";

const CharSheetPage = () => {
  const location = useLocation();

  const { image, name, race, charClass, backstory, stat } =
    location.state || {};
  console.log(location.state);

  return (
    <div className="body-background mt-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4 mt-5">
            {image && (
              <img
                src={image}
                alt="Generated Character"
                className="img-fluid rounded"
              />
            )}
          </div>
          <div className="col-lg-8 col-md-6 mt-5">
            <div className="character-sheet">
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
              {/* ...additional character sheet details... */}
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
                      return string.charAt(0).toUpperCase() + string.slice(1);
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
  );
};

export default CharSheetPage;
