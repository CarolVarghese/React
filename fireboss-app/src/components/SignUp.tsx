import React, {useState} from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth} from '../firebase'

const SignUp: React.FC = () =>  {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            window.location.href = './SignIn.tsx'
        }   catch (error)   {
            setError('Failed to create an account. Please try again.');
        }
    }

    return (
        <div className="max-w-sm mx-auto p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
            <input 
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'
                className='border p-2 mb-2'
            />

            <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            className='border p-2 mb-2'
            />

            {error && <p className="text-red-500">{error}</p>}
            <button type="submit" className="bg-blue-500 text-white p-2">
                Sign Up
            </button>
        </form>
        </div>
    )
}

export default SignUp