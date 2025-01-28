import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Link, useNavigate } from 'react-router-dom';

const GetStarted = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    jobTitle: '',
    levelOfPlay: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = ['firstName', 'lastName', 'email', 'city', 'state', 'jobTitle', 'levelOfPlay'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    if (missingFields.length === 0) {
      console.log('Form submitted:', formData);
      navigate('/Homepage');
    } else {
      setError(`Please fill out the following fields: ${missingFields.join(', ')}`);
    }
  };

  const jobTitles = ["Scout", "Coach", "Player", "Team Manager", "Other"];
  const levelOfPlay = ["High School", "College", "Semi-Professional", "Professional", "Amateur", "Other"];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-6 text-blue-600">Get Started with Scoutify</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
        
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="first-name">
              First Name
            </label>
            <input 
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
              id="first-name" 
              type="text" 
              placeholder="John" 
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="last-name">
              Last Name
            </label>
            <input 
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" 
              id="last-name" 
              type="text" 
              placeholder="Doe" 
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required 
            />
          </div>
        </div>
        
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input 
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
              id="email" 
              type="email" 
              placeholder="john@example.com" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>
        </div>
        
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="phone">
              Phone Number (Optional)
            </label>
            <input 
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
              id="phone" 
              type="tel" 
              placeholder="(123) 456-7890" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="city">
              City
            </label>
            <input 
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" 
              id="city" 
              type="text" 
              placeholder="New York" 
              name="city"
              value={formData.city}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="state">
              State
            </label>
            <input 
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" 
              id="state" 
              type="text" 
              placeholder="NY" 
              name="state"
              value={formData.state}
              onChange={handleChange}
              required 
            />
          </div>
        </div>
        
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="job-title">
              Job Title
            </label>
            <select 
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
              id="job-title"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              required
            >
              <option value="">Select a job title</option>
              {jobTitles.map((title, index) => (
                <option key={index} value={title}>{title}</option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="level-of-play">
              Level of Play
            </label>
            <select 
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
              id="level-of-play"
              name="levelOfPlay"
              value={formData.levelOfPlay}
              onChange={handleChange}
              required
            >
              <option value="">Select level of play</option>
              {levelOfPlay.map((level, index) => (
                <option key={index} value={level}>{level}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center justify-between mt-6">
          <Button variant="scoutify" type="submit">Submit</Button>
          <Link to="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
        
        <div className="mt-4 text-center">
          <Link to="/login" className="text-blue-600 hover:text-blue-800 transition-colors duration-300 font-semibold">
            Already a Member?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default GetStarted;