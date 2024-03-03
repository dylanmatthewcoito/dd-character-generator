
function LoginForm() {
    // Login form logic here
    return (
        <form>
             <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                id="login-email"
                type="email"
                className="form-control"
                required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="login-password" className="form-label">Password</label>
                <input
                id="login-password"
                type="password"
                className="form-control"
                required
                />
            </div>
            <button type="submit" className="btn btn-dark">Log In</button>
        </form>
    );
}

export default LoginForm;