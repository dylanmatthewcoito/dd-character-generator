import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

function LoginForm({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginUser, { loading, error }] = useMutation(LOGIN_USER);

    const handleEmailChange = (e) => setEmail(e.target.value);

    const handlePasswordChange = (e) => setPassword(e.target.value);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await loginUser({
                variables: { email, password },
            });

            Auth.login(data.login.token);
            console.log('User logged in:', data);

            // Store the token in localStorage or useContext to update global state
            //  localStorage.setItem('token', data.login.token);
            localStorage.setItem('username', data.login.user.username)
            // If using AuthContext
            // authContext.login(data.login.token);

            // Reset form fields
            setEmail('');
            setPassword('');

            // Trigger the onLoginSuccess callback
            if (typeof onLoginSuccess === 'function') {
                onLoginSuccess();
            }
        } catch (error) {
            console.error('Error logging in:', error.message);
            // Optionally update state to show error to the user
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="login-email" className="form-label">Email</label>
                <input
                    id="login-email"
                    type="email"
                    className="form-control"
                    required
                    value={email}
                    onChange={handleEmailChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="login-password" className="form-label">Password</label>
                <input
                    id="login-password"
                    type="password"
                    className="form-control"
                    required
                    value={password}
                    onChange={handlePasswordChange}
                />
            </div>
            {error && <div className="alert alert-danger" role="alert">
                Error logging in: {"Email or Password Incorrect"}
            </div>}
            <button type="submit" className="btn btn-dark">Log In</button>
        </form>
    );
}

export default LoginForm;
