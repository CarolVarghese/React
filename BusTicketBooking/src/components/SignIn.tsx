import React, {useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SignIn: React.FC = () => {
    const[email, setEmail] = useState('');
    const [password, setPassword] =useState('');
    const [message, setMessage] = useState('');

    const handleSignIn =async (e: React.FormEvent) => {
        e.preventDefault();

        try{
            const response = await axios.post('https://localhost:7191/api/users/login', {
                email,
                password
            });

            setMessage("Welcome back, ${response.data.name}!");

        } catch (error) {
            setMessage(" Error: " + (error as any).response?.data || "Invalid email or password!");
        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100 '>
            <form onSubmit={handleSignIn} className='bg-white p-8 rounded shadow-md w-96'>
                <h2 className='text-2xl font-bold mb-6 text-center'>Sign In</h2>

                <div className='mb-4'>
                    <label htmlFor="email" className='block text-gray-700 mb-2'>Email</label>
                    <input type="email" id='email' value={email} onChange={(e) => setEmail(e.target.value)}
                    className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-green-500' required />
                </div>

                <div className='mb-4'>
                    <label htmlFor="password" className='block text-gray-700 mb-2'>Password</label>
                    <input type="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)}
                    className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500' required />
                </div>

                <Link to="/homepage">


                <button type='submit' className='w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-coluors'>
                    Sign In
                </button>
                </Link>

                {message && <p className='mt-4 text-center'>{message}</p>}

            </form>
        </div>
    );
};

export default SignIn