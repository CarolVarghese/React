import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';

const HomePage: React.FC = () => {

    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const userName = useSelector((state: RootState) => state.auth.user?.name);

    return (
        <div className='min-h-screen bg-gray-100'>
            <header className='bg-green-600 text-white py-4'>
                <div className='container mx-auto flex justify-between items-center'>
                    <h1 className='text-2xl font-bold'>Bus Ticket Booking</h1>
                    <nav>
                        {isLoggedIn ? (
                            <ul className='flex space-x-4'>
                                <li>Hello, {userName}!</li>
                                <li><a href="/bookings" className='hover:underline'>My Bookings</a></li>
                                <li><a href="/profile" className='hover:underline'>Profile</a></li>
                                <li><a href="/logout" className='hover:underline'>Logout</a></li>
                            </ul>

                        ) : (
                            <ul className='flex space-x-4'>
                                <li><a href="/login" className='hover:Underline'>Login</a></li>
                                <li><a href="/signup" className='hover:underline'>Sign Up</a></li>
                            </ul>
                        )}
                    </nav>
                </div>
            </header>

            <main className='py-8'>
                <div className='container mx-auto px-4'>
                    <section>
                        <h2 className='text-3xl font-bold mb-4'>Welcome to Bus Ticket Booking</h2>
                        <p>Find the best bus routes and book tickets in just a few clicks</p>
                    </section>

                    {isLoggedIn && (
                        <section className='mt-8'>
                            <h3 className='text-2xl font-semibold'>Exclusive Offers for you</h3>
                            <p>Check out Our latest deals and offers for frequent travellers.</p>
                        </section>
                    )}
                </div>
            </main>

            <footer className='bg-gray-200 text-center py-4'>
                <p className='text-sm'>© 2024 Bus Ticket Booking. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default HomePage;