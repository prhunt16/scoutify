import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
    console.log('Login attempt with:', { email, password });
    alert(`Login attempt with email: ${email} and password: ${password}`);
    
    // Add navigation to the authenticated dashboard here
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">SIGN IN</h2>
        </div>
        <form onSubmit={handleSubmit} className="px-6 py-4">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between mb-6">
            <Link to="/forgot-password" className="text-blue-600 hover:text-blue-800 text-sm">
              Forgot your password?
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              SIGN IN
            </Button>
          </div>
        </form>
        <div className="px-6 py-4 bg-gray-100 text-center">
          <span className="text-gray-600">Don't have an account yet? </span>
          <Link to="/get-started" className="text-blue-600 hover:text-blue-800 font-bold">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;