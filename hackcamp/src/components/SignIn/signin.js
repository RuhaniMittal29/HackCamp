// src/components/SignIn/signin.js
import React, { useState } from 'react';
import Navbar from '../Navbar/navbar';
import './signin.css';

const SignInPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  const [isSignUp, setIsSignUp] = useState(true); // Toggle between Sign Up and Log In
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const validate = () => {
    const newErrors = {};
    const { fullName, email, password } = formData;

    if (isSignUp && !fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
    setFormData({ fullName: '', email: '', password: '' });
    setErrors({});
    setMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const { fullName, email, password } = formData;

    if (isSignUp) {
      const userData = { fullName, email, password };
      localStorage.setItem('user', JSON.stringify(userData));
      setMessage('Sign up successful! You can now log in.');
    } else {
      const storedUser = JSON.parse(localStorage.getItem('user'));

      if (storedUser && storedUser.email === email && storedUser.password === password) {
        setMessage(`Welcome back, ${storedUser.fullName}!`);
      } else {
        setErrors({ email: 'Invalid email or password' });
        return;
      }
    }

    setFormData({ fullName: '', email: '', password: '' });
    setErrors({});
  };

  const isFormValid = () => {
    return isSignUp
      ? formData.fullName && formData.email && formData.password && Object.keys(errors).length === 0
      : formData.email && formData.password && Object.keys(errors).length === 0;
  };

  const handleGoogleSignIn = () => {
    console.log('Google Sign-In');
  };

  const handleAppleSignIn = () => {
    console.log('Apple Sign-In');
  };

  return (
    <div>
      <Navbar />
      <div className="signin-page">
        <h2 className="signin-tagline">
          Your wellness journey starts here – let’s make it personal! Create your account to get started.
        </h2>
        <div className="signin-container">
          <h2 className="signin-title">{isSignUp ? 'Sign Up' : 'Log In'}</h2>
          <form className="signin-form" onSubmit={handleSubmit}>
            {isSignUp && (
              <div className="signin-field">
                <label htmlFor="fullName" className="signin-label">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="signin-input"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required={isSignUp}
                />
                {errors.fullName && <p className="error-message">{errors.fullName}</p>}
              </div>
            )}
            <div className="signin-field">
              <label htmlFor="email" className="signin-label">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                className="signin-input"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>
            <div className="signin-field">
              <label htmlFor="password" className="signin-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="signin-input"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {errors.password && <p className="error-message">{errors.password}</p>}
            </div>
            {message && <p className="success-message">{message}</p>}
            <button
              type="submit"
              className="signin-button"
              disabled={!isFormValid()}
              style={{
                opacity: isFormValid() ? 1 : 0.5,
                cursor: isFormValid() ? 'pointer' : 'not-allowed'
              }}
            >
              {isSignUp ? 'Sign Up' : 'Log In'}
            </button>
          </form>

          <div className="signin-divider">
            <span>or</span>
          </div>

          <button className="signin-google" onClick={handleGoogleSignIn}>Sign in with Google</button>
          <button className="signin-apple" onClick={handleAppleSignIn}>Sign in with Apple</button>

          <div className="toggle-option">
            <p>
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
              <button onClick={handleToggle} className="toggle-button">
                {isSignUp ? 'Log In' : 'Sign Up'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
