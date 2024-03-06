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
                    <h3>{name}</h3>
                    <p>Class: {charClass}</p>
                    <p>Race: {race}</p>
                    <p>Backstory: {backstory}</p>
                    <div className="stats">
                        <p>Strength: {stat.strength}</p>
                        <p>Dexterity: {stat.dexterity}</p>
                        <p>Constitution: {stat.constitution}</p>
                        <p>Intelligence: {stat.intelligence}</p>
                        <p>Wisdom: {stat.wisdom}</p>
                        <p>Charisma: {stat.charisma}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
}

export default ProfilePageComponent;
