import React, { useState } from 'react';

const PromptPage = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [race, setRace] = useState('');
    const [charClass, setCharClass] = useState('');
    const [backstory, setBackstory] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault(); // Prevents the default form submit action
      onSubmit({ name, race, charClass, backstory }); // Sends the state variables
    };
  
    return (

        <div>
            <header className="bg-secondary text-white text-center p-5 mb-4">
                <div className="container">
                    <h1 className="charCreateHeader">Create Your Character</h1>
                </div>
            </header>
            <form onSubmit={handleSubmit} className="container mt-5">
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
                <label htmlFor="backstory" className="form-label">Backstory:</label>
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
        </div>
    );
};

export default PromptPage;
