import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TOKEN_STORAGE_KEY } from "../App";
import { logInUser } from "./api";
import './Login.css'

const Login = (props) => {
  const { setToken } = props;

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try{
      const result = await logInUser(email, password)

      if(result) {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        localStorage.setItem(TOKEN_STORAGE_KEY, result.token)
        setToken(result.token)
        window.location.href = ('/')
      } else if (!result) {
        setEmail("");
        setPassword("");
        window.alert('Invalid Login Credentials')
      }
    } catch (e) {
        throw e;
      } 
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div id="loginPage">
      <h1>log in or create an account</h1>

      <form id="loginForm">
        <div>
          <label>email</label>
          <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="password-input-container">
          <label>password</label>
          <div className="password-input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="password-toggle" onClick={handleTogglePassword}>
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>continue</button>
        </div>
        <div>
        <button onClick={() => {navigate("/register")}}>sign up</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
