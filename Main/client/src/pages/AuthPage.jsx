// src/pages/AuthPage.js
import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import { useNavigate } from 'react-router-dom';

function AuthPage() {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const navigate = useNavigate();

    // Define the handleLoginSuccess function
    const handleLoginSuccess = () => {
        navigate('/app/prompt'); // Adjust according to your routes
    };

    // Define the handleSignupSuccess function
    const handleSignupSuccess = () => {
        navigate('/app/prompt');
    };

    const toggleMode = () => setIsLoginMode(!isLoginMode);

    return (
        // Left original code incase something breaks -DC
        //
        // <div className="auth-container container py-5 mt-5">
        //     <nav className="navbar py-5 fixed-top">
        //         <div className="container">
        //             <div className="logo red">D&D Character Generator</div>
        //         </div>
        //     </nav>
        //     <h1 className='d-flex justify-content-center'>{isLoginMode ? 'Login' : 'Sign up'}</h1>
        //     {isLoginMode
        //         ? <LoginForm onLoginSuccess={handleLoginSuccess} />
        //         : <SignupForm onSignupSuccess={handleSignupSuccess} />}
        //     <button className='btn btn-dark login-button' onClick={toggleMode}>
        //          {isLoginMode ? 'Signup here' : 'Return to Log in'}
        //     </button>
        // </div>
        <div className="auth-container container py-5">
            <nav className="navbar py-5 fixed-top">
                <div className="container">
                    <div className="logo red">D&D Character Generator</div>
                </div>
            </nav>
            <div className="d-flex flex-column align-items-center mt-2">
                <h1 className="mb-2">{isLoginMode ? 'Login' : 'Sign up'}</h1>
                <div className="form-container">
                    {isLoginMode ? (
                        <LoginForm onLoginSuccess={handleLoginSuccess} />
                    ) : (
                        <SignupForm onSignupSuccess={handleSignupSuccess} />
                    )}
                </div>
                <button className="btn btn-dark login-button mt-2" onClick={toggleMode}>
                    {isLoginMode ? 'Signup here' : 'Return to Log in'}
                </button>
            </div>
        </div>
    );
}

export default AuthPage;