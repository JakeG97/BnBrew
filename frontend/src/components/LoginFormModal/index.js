import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(Object.values(data.errors));
        }
      );
  };

  const handleDemoLogin = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login({ credential: 'SlimJim', password: 'slimmy' }))
      .then(closeModal)
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(Object.values(data.errors));
        }
      );
  };

  return (
    <div id="login-container">
      <h1>Log In</h1>
      <form id='login' onSubmit={handleSubmit}>
        <div id='login-error-handling'>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
              ))}
          </ul>
        </div>
        <label>
          Username or Email
          <div className='login-input'>
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </div>
        </label>
        <label>
          Password
          <div className='login-input'>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </label>
        <button id='loginButton' type="submit">Log In</button>
      </form>
      <button id='demoLoginButton' onClick={handleDemoLogin}>Log in as Demo User</button>
    </div>
  );
}

export default LoginFormModal;