import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const PromptPage = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [race, setRace] = useState('');
    const [charClass, setCharClass] = useState('');
    const [backstory, setBackstory] = useState('');
    const [imageUrl, setImageUrl] = useState(''); // State to store the generated image URL
    const [isLoading, setIsLoading] = useState(false);// State to manage loading

    const [Stats, setAllocatedStats] = useState({
        Strength: 0,
        Dexterity: 0,
        Constitution: 0,
        Intelligence: 0,
        Wisdom: 0,
        Charisma: 0

    });
    const [totalPoints, setTotalPoints] = useState(30);

    const navigate = useNavigate();

    const handleAddStat = (event, stat) => {
        event.preventDefault();
        if (totalPoints > 0) {
            setAllocatedStats(prevStats => ({
                ...prevStats,
                [stat]: prevStats[stat] + 1
            }));
            setTotalPoints(prevPoints => prevPoints - 1);
        }
    };

    const handleRemoveStat = (event, stat) => {
        event.preventDefault();
        if (Stats[stat] > 0) {
            setAllocatedStats(prevStats => ({
                ...prevStats,
                [stat]: prevStats[stat] - 1
            }));
            setTotalPoints(prevPoints => prevPoints + 1);
        }
    };



    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevents the default form submit action
        setIsLoading(true); // Start loading

        // Prepare the data to be sent to the backend
        const formData = { 
            name,
            race,
            charClass,
            backstory,
            strength: Stats.Strength,
            dexterity: Stats.Dexterity,
            constitution: Stats.Constitution,
            intelligence: Stats.Intelligence,
            wisdom: Stats.Wisdom,
            charisma: Stats.Charisma
         };

        //Once we deploy to render we will hardcode our url string into an env file but for testing purposes localhost will work just fine
        //Commented out below is what that might look like

        /*  
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/generate-image`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        */

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



        try {
            const response = await fetch('http://localhost:3001/api/generate-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            console.log(data)

        if (response.ok) {
            setImageUrl(data.imageUrl); 
            // Navigate to CharSheetPage with state

            navigate('/app/charsheet', 
            { state: { ...data, name, race, charClass, backstory, Stats } }
            );

        } 
        else {
                throw new Error('Failed to generate image');
        }} 
        catch (error) {
            console.error('Error generating image:', error);
        }

    };
  
    return (

        <div className='body-background pt-5'>
            {isLoading ? (
           <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
           <div className="spinner-border custom-spinner" role="status">
             <span className="visually-hidden">Loading</span>
           </div>
           <span className="ms-3 loading-indicator">Loading...</span>
         </div>
            ) : (
         
            <form onSubmit={handleSubmit} className="container">
            <div className="mb-1">
                <label htmlFor="name" className="form-label">Name:</label>
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
                <label htmlFor="race" className="form-label">Race:</label>
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
                <label htmlFor="class" className="form-label">Class:</label>
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
                <label htmlFor="backstory" className="form-label">Description/Backstory:</label>
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
                <h2 className='allocate-stats'>Allocate Stats</h2>
                <div>
                    <p className='total-points-line'>Total Points Remaining: <span className='bolded'>{totalPoints}</span></p>
                    {Object.keys(Stats).map(stat => (
                        <div key={stat}>
                            <button className='btn btn-dark m-1' onClick={(e) => handleRemoveStat(e, stat)}>-</button>
                            <button className='btn btn-dark m-1' onClick={(e) => handleAddStat(e, stat)}>+</button>
                            <span className='prompt-stats'>{stat}: <span className='bolded'>{Stats[stat]}</span></span>
                        </div>
                    ))}
                </div>
            </div>



            <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-dark">Generate Character</button>
            </div>
            </form>
            )}
            {imageUrl && (
                <div className="text-center mt-4">
                    <img src={imageUrl} alt="Generated Character" className="img-fluid" />
                </div>
            )}
        </div>
    );
};

export default PromptPage;