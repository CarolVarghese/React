import React, { useState, FormEvent } from 'react';

import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';



const AddUser: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'users'), {
        name,
        email
      });
      setName('');
      setEmail('');
    } catch (err) {
      setError('Error adding user.');
    }
  };


  return (
    <div className="max-w-sm mx-auto p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add User</h2>
    <form onSubmit={handleSubmit}>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="border p-2 mb-2"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="border p-2 mb-2"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2">
        Add User
      </button>
    </form>
    </div>
  );
};

export default AddUser;
