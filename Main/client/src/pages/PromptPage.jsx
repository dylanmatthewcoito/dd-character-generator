import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";
import Auth from "../utils/auth";

const PromptPage = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [race, setRace] = useState("");
  const [charClass, setCharClass] = useState("");
  const [backstory, setBackstory] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // State to store the generated image URL
  const [isLoading, setIsLoading] = useState(false); // State to manage loading

  const [stat, setAllocatedstat] = useState({
    Charisma: 0,
    Constitution: 0,
    Dexterity: 0,
    Intelligence: 0,
    Strength: 0,
    Wisdom: 0,
  });
  const [totalPoints, setTotalPoints] = useState(30);

  const navigate = useNavigate();

  const handleAddStat = (event, stat) => {
    event.preventDefault();
    if (totalPoints > 0) {
      setAllocatedstat((prevstat) => ({
        ...prevstat,
        [stat]: prevstat[stat] + 1,
      }));
      setTotalPoints((prevPoints) => prevPoints - 1);
    }
  };

  const handleRemoveStat = (event, statKey) => {
    event.preventDefault();
    if (stat[statKey] > 0) {
      setAllocatedstat((prevstat) => ({
        ...prevstat,
        [statKey]: prevstat[statKey] - 1,
      }));
      setTotalPoints((prevPoints) => prevPoints + 1);
    }
  };

  const CREATE_CHARACTER = gql`
    mutation CreateCharacter(
      $username: String!
      $characterInput: CharacterInput!
    ) {
      createCharacter(username: $username, characterInput: $characterInput) {
        name
        charClass
        race
        backstory
        image
        stat {
          charisma
          constitution
          dexterity
          intelligence
          strength
          wisdom
        }
      }
    }
  `;
  const [createCharacter] = useMutation(CREATE_CHARACTER);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const storedUsername = localStorage.getItem("username");
    try {
      setIsLoading(true);
      const { data } = await createCharacter({
        variables: {
          username: storedUsername, // Provide the actual username value
          characterInput: {
            name,
            charClass,
            race,
            backstory,
            image: imageUrl, // Assuming imageUrl is set correctly
            stat: {
              charisma: stat.Charisma,
              constitution: stat.Constitution,
              dexterity: stat.Dexterity,
              intelligence: stat.Intelligence,
              strength: stat.Strength,
              wisdom: stat.Wisdom,
            },
          },
        },
      });

      const createdCharacter = data.createCharacter;
      setImageUrl(imageUrl);

      console.log({ state: { name, race, charClass, backstory, stat } });
      // Handle the response as needed
      console.log("Created Character:", createdCharacter);

      // Navigate to CharSheetPage with the created character data
      navigate("/app/charsheet", { state: { ...createdCharacter } });
    } catch (error) {
      console.error("Error creating character:", error);
    }
  };

  // Below is used for testing the loading page, to test make sure to uncomment and comment out the fetch chain
  // setTimeout(async () => {
  //     // Simulate setting data after fetching
  //     // You can replace this with your actual fetching logic when ready
  //     const simulatedData = { imageUrl: 'path/to/your/image.jpg' };
  //     setImageUrl(simulatedData.imageUrl);

  //     // Navigate or update state as needed after fetching data
  //     // For example, navigate to another route or update local state
  //     navigate('/charsheet', { state: { name, race, charClass, backstory, ...simulatedData } });

  //     setIsLoading(false); // Stop loading after simulation
  // }, 20000000); // Simulate a 3-second delay

  return (
    <div>
      {Auth.loggedIn() ? (
        <>
          <div className="body-background pt-5">
            {isLoading ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "70vh" }}
              >
                <div role="status">
                <span className="loader m-4"></span>
                </div>
                <span className="ms-3 loading-indicator">
                  Brewing your Champion
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="container pb-5">
                <div className="mb-1">
                  <label htmlFor="name" className="form-label">
                    Name:
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-1">
                  <label htmlFor="race" className="form-label">
                    Race:
                  </label>
                  <input
                    id="race"
                    type="text"
                    className="form-control"
                    value={race}
                    onChange={(e) => setRace(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-1">
                  <label htmlFor="class" className="form-label">
                    Class:
                  </label>
                  <input
                    id="class"
                    type="text"
                    className="form-control"
                    value={charClass}
                    onChange={(e) => setCharClass(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="backstory" className="form-label">
                    Description/Backstory:
                  </label>
                  <textarea
                    id="backstory"
                    className="form-control"
                    rows="5"
                    value={backstory}
                    onChange={(e) => setBackstory(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <h2 className="allocate-stats">Allocate Stats</h2>
                  <div>
                    <p className="total-points-line">
                      Total Points Remaining:{" "}
                      <span className="bolded">{totalPoints}</span>
                    </p>
                    {Object.keys(stat).map((statKey) => (
                      <div key={statKey}>
                        <button
                          className="btn btn-dark m-1"
                          onClick={(e) => handleRemoveStat(e, statKey)}
                        >
                          -
                        </button>
                        <button
                          className="btn btn-dark m-1"
                          onClick={(e) => handleAddStat(e, statKey)}
                        >
                          +
                        </button>
                        <span className="prompt-stats">
                          {statKey}:{" "}
                          <span className="bolded">{stat[statKey]}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-dark">
                    Generate Character
                  </button>
                </div>
              </form>
            )}
            {imageUrl && (
              <div className="text-center mt-4">
                <img
                  src={imageUrl}
                  alt="Generated Character"
                  className="img-fluid"
                />
              </div>
            )}
          </div>
        </>
      ) : (
        <div>
          <p className="mt-5">
            You need to be logged in to create a character! Please log in!
          </p>
          <button
            className="btn btn-dark mt-3"
            onClick={() => window.location.assign("/")} // Redirect to the home page
          >
            Return to Log in
          </button>
        </div>
      )}
    </div>
  );
};

export default PromptPage;
