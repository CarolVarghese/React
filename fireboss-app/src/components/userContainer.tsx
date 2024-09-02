import React, { useEffect, useState } from 'react';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';


interface User {
  name: string;
  email: string;
}


const UserContainer: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const getUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const usersList: User[] = querySnapshot.docs.map(doc => doc.data() as User);
        setUsers(usersList);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch users.');
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  return loading ? (
    <h2 className='text-center'>Loading...</h2>
  ) : error ? (
    <h2 className='text-center text-red-500'>{error}</h2>
  ) : (
    <div className='container mx-auto p-4'>
      <h2 className='text-2xl font-bold mb-4'>User List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {users.map((user, index) => (
          <div key={index} className="p-4 border rounded shadow">
          <p>{user.name}</p>
          <p>{user.email}</p>
        </div>
        ))}
      </div>
    </div>
  );
};

export default UserContainer;
