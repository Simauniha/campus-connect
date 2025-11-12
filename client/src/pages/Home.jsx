import React from 'react';

const Home = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div>
            <h2>Welcome {user?.name || 'Guest'}!</h2>
            <p>This is the Campus Connect Home page.</p>
            <p>Click on "Posts" in the navbar to see the feed.</p>
        </div>
    );
};

export default Home;
