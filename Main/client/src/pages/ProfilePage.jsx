import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_CHARACTERS } from '../utils/queries';

function ProfilePageComponent() {
  // Hardcoding the username for testing purposes
  const hardcodedUsername = "mikey";

  const { loading, error, data } = useQuery(GET_USER_CHARACTERS, {
    variables: { username: hardcodedUsername },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className='body-background pt-5 m-5'>
        <h2 className='userProfileName'>{hardcodedUsername}'s Characters</h2>
        <div className="character-cards">
            {data?.getUserCharacters.map(({ _id, name, charClass, race, backstory, image, stat }) => (
                <div key={_id} className="character-card">
                    <img src={image} alt={`${name}`} />
                    <h3 className='profile-character-name mt-3'>{name}</h3>
                    <p><span className='profile-stats'>Class:</span> {charClass}</p>
                    <p><span className='profile-stats'>Race:</span> {race}</p>
                    <p><span className='profile-stats'>Backstory:</span> {backstory}</p>
                    <div className="stats">
                        <p><span className='profile-stats'>Strength:</span> {stat.strength}</p>
                        <p><span className='profile-stats'>Dexterity:</span> {stat.dexterity}</p>
                        <p><span className='profile-stats'>Constitution:</span> {stat.constitution}</p>
                        <p><span className='profile-stats'>Intelligence:</span> {stat.intelligence}</p>
                        <p><span className='profile-stats'>Wisdom:</span> {stat.wisdom}</p>
                        <p><span className='profile-stats'>Charisma:</span> {stat.charisma}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
}

export default ProfilePageComponent;
