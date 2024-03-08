import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from '../utils/mutations';
import Auth from '../utils/auth';


const SignupForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [customError, setCustomError] = useState(null);
    const [createUser, { loading }] = useMutation(SIGNUP_USER);

    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCustomError(null);

        try {
            const { data } = await createUser({
                variables: { username, email, password },
            });

            console.log('User created:', data.createUser);
            // Reset form fields
            setUsername('');
            setEmail('');
            setPassword('');
            
            if (typeof onSignupSuccess === 'function') {
                Auth.login(data.login.token);
                onSignupSuccess();
            }
            
        } catch (error) {
            if (error.message.includes("E11000")) {
                setCustomError('Email already exists');
            } else {
                console.error('Error creating user:', error.message);
                setCustomError(error.message); // Fallback to generic error message
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="signup-username" className="form-label">Username</label>
                <input
                    id="signup-username"
                    type="text"
                    className="form-control"
                    required
                    value={username}
                    onChange={handleUsernameChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="signup-email" className="form-label">Email</label>
                <input
                    id="signup-email"
                    type="email"
                    className="form-control"
                    required
                    value={email}
                    onChange={handleEmailChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="signup-password" className="form-label">Password</label>
                <input
                    id="signup-password"
                    type="password"
                    className="form-control"
                    required
                    value={password}
                    onChange={handlePasswordChange}
                />
            </div>
            {customError && <div className="alert alert-danger" role="alert">
                Error: {customError}
            </div>}
            <button type="submit" className="btn btn-dark">Sign Up</button>
        </form>
    );
};

export default SignupForm;