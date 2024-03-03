import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from '../utils/mutations';

const SignupForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [createUser] = useMutation(SIGNUP_USER);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await createUser({
                variables: { username, email, password },
            });

            console.log('User created:', data.createUser);

            // Reset form fields
            setUsername('');
            setEmail('');
            setPassword('');
        } catch (error) {
            console.error('Error creating user:', error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="userName" className="form-label">Username</label>
                <input
                    id="userName"
                    type="text"
                    className="form-control"
                    required
                    value={username}
                    onChange={handleUsernameChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                    id="email"
                    type="email"
                    className="form-control"
                    required
                    value={email}
                    onChange={handleEmailChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="signuppassword" className="form-label">Password</label>
                <input
                    id="signuppassword"
                    type="password"
                    className="form-control"
                    required
                    value={password}
                    onChange={handlePasswordChange}
                />
            </div>
            <button type="submit" className="btn btn-dark">Sign Up</button>
        </form>
    );
};

export default SignupForm;