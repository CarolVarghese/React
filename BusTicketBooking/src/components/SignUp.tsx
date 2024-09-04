import React, { useState } from 'react';

const SignUp: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState ('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("pasword do not match!");
            return;
        }

        console.log("User signed up with:", {name, email, password});
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <form onSubmit={handleSignUp} className='bg-white p-8 rounded shadow-md w-96'>
                <h2 className='text-2xl font-bold mb-6 text-center'>Sign Up</h2>

                <div className='mb-4'>
                    <label htmlFor="name" className='block text-gray-700 mb-2'>Name</label>
                        <input type="text" id='name' value={name} onChange={(e) =>setName(e.target.value)}
                        className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'required />
                    
                </div>

                <div className='mb-4'>
                    <label htmlFor="email" className='block text-gray-700 mb-2'>Email</label>
                    <input type="email" id='email' value={email} onChange={(e) => setEmail(e.target.value)}
                    className='w-fill px-4 py-2 border ounded-md focus:outline-none focus:ring-2 focus:ring-green-500' required />
                </div>

                <div className='mb-4'>
                    <label htmlFor="password" className='block text-gray-700 mb-2'>Password</label>
                    <input type="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)}
                    className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500' required/>
                </div>

                <div className='mb-6'>
                    <label htmlFor="confirmPassword" className='block text-gray-700 mb-2'>Confirm password</label>
                    <input type="password" id='confirmPassword' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                    className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-green-500' required />
                </div>

                <button type='submit' className='w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors'>Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;