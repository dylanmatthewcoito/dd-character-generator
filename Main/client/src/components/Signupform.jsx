
function SignupForm() {
    // Signup form logic here
    return (
        <form>
            <div className="mb-3">
                <label htmlFor="userName" className="form-label">Username</label>
                <input
                id="userName"
                type="text"
                className="form-control"
                required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                id="email"
                type="email"
                className="form-control"
                required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="signuppassword" className="form-label">Password</label>
                <input
                id="signuppassword"
                type="password"
                className="form-control"
                required
                />
            </div>
            <button type="submit" className="btn btn-dark">Sign Up</button>
        </form>
    );
}

export default SignupForm;