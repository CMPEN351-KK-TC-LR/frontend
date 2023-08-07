import React, { useState, useEffect, createContext, useContext } from 'react';

// Create a context to provide and consume authentication data
export const AuthContext = createContext();

// Custom hook for easy access to AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider is a wrapper component
export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token'); // Get the token from local storage
        if (!token) {
            setLoading(false);
            return;
        }

        fetch('http://localhost:5000/api/users/user-info', {
            method: 'GET',
            headers: {
                'x-access-token': localStorage.getItem('token'),  // Include the token in request
                'Content-Type': 'application/json',
            },
        })
            .then(async response => {
                if (response.ok) {
                    // Reading the ReadableStream and converting it to text
                    const textData = await response.text();
                    // Check if the response starts with '<', which suggests it's not JSON.
                    if (textData.trim().startsWith('<')) {
                        throw new Error('Received HTML response instead of JSON');
                    }
                    return JSON.parse(textData); // Parsing the text as JSON
                } else {
                    throw new Error(`Error: ${response.status}`);
                }
            })
            .then(data => {
                console.log(data);
                setCurrentUser(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error occurred while fetching user info:", error);
                setCurrentUser(null);
                setLoading(false);
            });
    }, []);


    const login = (user) => {
        setCurrentUser(user);
        localStorage.setItem('token', user.token);
    };

    const value = {
        loading,
        currentUser,
        login
    };

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export default useAuth;