// src/pages/AuthPage.js
import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import { useNavigate } from "react-router-dom";

function AuthPage() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const navigate = useNavigate();

  // Define the handleLoginSuccess function
  const handleLoginSuccess = () => {
    navigate("/app/prompt"); // Adjust according to your routes
  };

  // Define the handleSignupSuccess function
  const handleSignupSuccess = () => {
    navigate("/app/prompt");
  };

  const toggleMode = () => setIsLoginMode(!isLoginMode);

  return (
    <div className="auth-container container py-5 mt-5">
      <nav className="navbar py-5 fixed-top">
        <div className="container">
          <div className="logo red">D&D Character Generator</div>
        </div>
      </nav>
      <div className = "d20body">
<ul className="d20">
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
  <li>5</li>
  <li>6.</li>
  <li>7</li>
  <li>8</li>
  <li>9.</li>
  <li>10</li>
  <li>11</li>
  <li>12</li>
  <li>13</li>
  <li>14</li>
  <li>15</li>
  <li>16</li>
  <li>17</li>
  <li>18</li>
  <li>19</li>
  <li>20</li>
</ul>
</div>
      <h2 className="h2">{isLoginMode ? "Login" : "Sign up"}</h2>
      {isLoginMode ? (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      ) : (
        <SignupForm onSignupSuccess={handleSignupSuccess} />
      )}
      <button className="btn btn-dark my-3" onClick={toggleMode}>
        {isLoginMode ? "Signup here" : "Return to Log in"}
      </button>
    </div>
  );
}

export default AuthPage;
