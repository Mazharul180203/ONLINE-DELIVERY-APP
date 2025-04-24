import React from 'react';

const UserLogin = () => {
    return (
        <div>
            <h3>what's your Email</h3>
            <input required type="email" placeholder="Enter your email"/>
            <h3>Enter password</h3>
            <input required type="password" placeholder="password"/>
            <button type="submit">Login</button>
        </div>
    );
};

export default UserLogin;