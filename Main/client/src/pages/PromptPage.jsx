import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const PromptPage = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [race, setRace] = useState('');
    const [charClass, setCharClass] = useState('');
    const [backstory, setBackstory] = useState('');
    const [imageUrl, setImageUrl] = useState(''); // State to store the generated image URL
    const [isLoading, setIsLoading] = useState(false); // State to manage loading
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevents the default form submit action
        setIsLoading(true); // Start loading

        // Prepare the data to be sent to the backend
        const formData = { name, race, charClass, backstory };

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
            navigate('/charsheet', { state: { ...data, name, race, charClass, backstory } });
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
             <span className="visually-hidden">Loading...</span>
           </div>
           <span className="ms-3 loading-indicator">Loading...</span>
         </div>
            ) : (
         
            <form onSubmit={handleSubmit} className="container">
            <div className="mb-3">
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
            <div className="mb-3">
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
            <div className="mb-3">
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
                <label htmlFor="backstory" className="form-label">Description:</label>
                <textarea
                id="backstory"
                className="form-control"
                rows="3"
                value={backstory}
                onChange={(e) => setBackstory(e.target.value)}
                required
                />
            </div>
            <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-secondary">Generate Image</button>
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
