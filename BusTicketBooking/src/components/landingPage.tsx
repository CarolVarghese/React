import React from 'react';

const LandingPage: React.FC = () => {
    return (
        <div className='flex flex-col min-h-screen bg-gray-100'>
            <header className='relative bg-green-600 text-white-200 text-center py-16 bg-cover bg-center' style={{backgroundImage: "url(https://live.staticflickr.com/4155/34326182980_4724ee29f4_b.jpg)"}}>
                
                <div className='relative z-10 flex flex-col items-center'>
                
                <div className='bg-black bg-opacity-70 p-4 rounded-md inline-block'>
                    <h1 className=' text-4xl font-bold text-teal-500'>Bus Ticket Booking</h1>
                    <p className='mt-4 text-xl text-green-600'>Your journey starts here</p>
                </div>
                <div className='mt-6 space-x-4'>
                    <button className='bg-white text-green-600 py-2 px-4 rounded shadow-lg hover:bg-gray-100'>
                        Sign In
                    </button>
                    <button className='bg-white text-green-600 py-2 px-4 rounded shadow-lg hover:bg-gray-100'>
                        Sign Up
                    </button>
                
                <button className=' bg-gray-300 text-gray-700 py-2 px-4 rounded shadow-lg hover:bg-gray-200'>
                    Book Now
                </button>
                </div>
                </div>
            </header>
            <section className='flex-1 flex flex-col items-center py-12'>
                <div className='container mx-auto px-4'>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                        <div className='bg-white p-6 rounded-lg shadow-lg text-center'>
                            <h2 className='text-2xl font-semibold'>Easy Booking</h2>
                            <p className='mt-4'>Book your Bus Tickets With Just a few Clicks.</p>
                        </div>
                        <div className='bg-white p-6 rounded-lg shadow-lg text-center'>
                            <h2 className='text-2xl font-semibold'>Real-Time Availability</h2>
                            <p className='mt-4'>Check your bus availability and schedules in real-time.</p>
                        </div>
                        <div className='bg-white p-6 rounded-lg shadow-lg text-center'>
                            <h2 className='text-2xl font-semibold'>Secure Payments</h2>
                            <p className='mt-4'>Pay securely with multiple payment Options.</p>
                        </div>
                    </div>
                </div>
            </section>
            <footer className='bg-gray-200 text-center py-4 mt-auto'>
                <p className='text-sm'>© 2024 Bus Ticket Booking. All Rights Reserved</p>
            </footer>
        </div>
    );
};

export default LandingPage;