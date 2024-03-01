import React from 'react';
import { useLocation } from 'react-router-dom';

const CharSheetPage = () => {
  const location = useLocation();
  const { imageUrl, name, race, charClass, backstory } = location.state || {};

  return (
    <div className="body-background">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4 mt-5">
            {imageUrl && (
              <img src={imageUrl} alt="Generated Character" className="img-fluid rounded" />
            )}
          </div>
          <div className="col-lg-8 col-md-6 mt-5">
            <div className="character-sheet">
              <h1 className="display-4 char-name">{name}</h1>
              <p className="lead"><span className='bolded'>Race: </span>{race}</p>
              <p className="lead"><span className='bolded'>Class: </span>{charClass}</p>
              <p className="lead"><span className='bolded'>Description: </span>{charClass}{backstory}</p>
              {/* ...additional character sheet details... */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharSheetPage;
